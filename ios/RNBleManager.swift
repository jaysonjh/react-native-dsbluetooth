//
//  RNBleManager.swift
//  RNDsbluetooth
//
//  Created by Jaysonj on 2019/2/17.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import CoreBluetooth

@objc
public protocol RNBleManagerDelegate {
    func dispatchEvent(_ name: String, value: Any?)
}

@objc
class RNBleManager : NSObject {
    
    private let bleManager: BLEAPIManager
    
    @objc
    public var delegate: RNBleManagerDelegate?
    
    @objc
    public init(restoreStateIdentifier: String?, enableLog: Bool) {
        BLEAPIManager.restoreKey = restoreStateIdentifier
        bleManager = BLEAPIManager.shared
        super.init()
        if (enableLog) {
            bleManager.setLogOn(withCode: "^DS*&0IJ#_jiKLPURIFIT$")
            bleManager.logOut = { (log) in
                print("\(log)")
            }
        }
        bleManager.delegate = self
    }
    
    @objc
    public func sdkVersion(_ resole: @escaping Resolve, reject:  @escaping Reject) {
        let version = BLEAPIManager.shared.version()
        if version.count > 0 {
            resole(version)
        }else {
            reject("0","version is null",nil)
        }
    }
    
    @objc
    public func startScan(filter: Set<String>?, options: [String: Any]?) {
        // iOS handles allowDuplicates option to receive more scan records.
        var bleOptions = [String:Any]()
        if let options = options {
            if let allowDuplicates = options["allowDuplicates"] as? Bool {
                bleOptions[CBCentralManagerScanOptionAllowDuplicatesKey] = allowDuplicates
            }
        }
        bleManager.scan(withServices: nil, options: options != nil ? bleOptions : nil, filterNames: filter)
    }
    
    @objc
    public func stopScan() {
        bleManager.stopScan()
    }
    
    @objc
    public func enableDebug(_ debug: Bool) {
        bleManager.debug = debug;
    }
    
    @objc
    public func connect(identifier: String?, mac: String?) {
        if let connectID = identifier {
            bleManager.connect(withIdentifier: connectID)
        }else {
            bleManager.connect(withMac: mac)
        }
    }
    
    @objc
    public func disconnect(identifier: String?) {
        bleManager.disconnect(withIdentifier: identifier)
    }
    
    @objc
    public func state(_ resole: @escaping Resolve){
        return resole(bleManager.bleState == .on)
    }
    
    @objc
    public func bandSend(_ command: Int, data: Any?, resole: @escaping Resolve, reject:  @escaping Reject) {
        if let sendTypes = RNBleSendType.init(rawValue: command) {
            // 转化为SDK对象的指令和数据格式
            let bandCommand = sendTypes.toNativeBandCommandType()
            let bandData = sendTypes.toNativeBandSendValue(data)
            bleManager.band?.makeFunc(bandCommand, data: bandData, callback: {(result, success, error) in
                if success {
                    // 转化SDK结果为JS对象的数据格式
                    let returnValue = sendTypes.toJSBandValue(result)
                    resole(returnValue)
                }else {
                    if let err = error {
                        reject("\(BleErrorCode.OperationTimedOut.rawValue)",err.localizedDescription,err as NSError)
                    }else {
                        reject("\(BleErrorCode.UnknownError.rawValue)","Timeout",RNBleError.init(errorCode: BleErrorCode.UnknownError, reason: "Timeout", attErrorCode: nil, iosErrorCode: nil) as NSError)
                    }
                }
            })
        }
    }
    
    @objc
    public func bandSyncData() {
        bleManager.band?.syncDelegate = self
        bleManager.band?.makeFunc(.sync, data: nil, callback: nil)
    }
    
    @objc
    public func bandBind() {
        bleManager.band?.bindDelegate = self
        bleManager.band?.makeFunc(.bind, data: nil, callback: nil)
    }
    
    func bandNotify() {
        bleManager.band?.notify = { [weak self] (type, data, error) in
            let result = self?.handlerNotify(autoType: type, data: data)
            self?.dispatchEvent(RNBleEvent.notifyEvent, eventType: .notifyEvent, value: result!, error: nil)
        }
    }
    
    @objc
    public func destroy() {
        bleManager.band?.disconnect()
        bleManager.delegate = nil
    }
    
    @objc
    public func bandDfu(_ dfuFile: Any, resole: @escaping Resolve, reject:  @escaping Reject) {
        if let dfuData = RNBleSendType.dfu.toNativeBandSendValue(dfuFile) {
            if let dfu = dfuData as? DSBLEDFUSet {
                bleManager.dfuDelegate = self
                bleManager.handleDFU(With: dfu)
                resole(true)
            }else {
                reject("\(BleErrorCode.BluetoothUnsupported.rawValue)","无法识别的DFU文件格式",RNBleError.init(errorCode: BleErrorCode.BluetoothUnsupported, reason: "无法识别的DFU文件格式", attErrorCode: nil, iosErrorCode: nil) as NSError)
            }
        }else {
            reject("\(BleErrorCode.BluetoothUnsupported.rawValue)","无法识别的DFU文件格式",RNBleError.init(errorCode: BleErrorCode.BluetoothUnsupported, reason: "无法识别的DFU文件格式", attErrorCode: nil, iosErrorCode: nil) as NSError)
        }
    }
}

// MARK: - 处理消息发送
extension RNBleManager {
    
    fileprivate func dispatchEvent(_ event: String, eventType: RNBleEventTypes, value: Any, error: RNBleError?) {
        let eventValue = handlerEvent(event, eventType: eventType, value: value, error: error)
        delegate?.dispatchEvent(event, value: eventValue)
    }
    
    fileprivate func handlerNotify(autoType: DSBLEAutoType,data: Any?) -> [String : Any] {
        return [
            "type": autoType.rawValue,
            "data": data ?? NSNull(),
        ]
    }
    
    /// 封装发送事件格式
    ///
    /// - Parameters:
    ///   - event: 事件类型
    ///   - value: 事件数据
    fileprivate func handlerEvent(_ event: String,eventType: RNBleEventTypes, value: Any, error: RNBleError?) -> [String : Any] {
        return [
            "event": eventType.rawValue,
            "error": error?.asJSObject() ?? NSNull(),
            "data": value,
        ]
    }
}

// MARK: - DSBLEScanConnectDelegate
extension RNBleManager: DSBLEScanConnectDelegate {
    
    func notifyState(_ state: BLEManagerState) {
        /// 系统蓝牙变更
        dispatchEvent(RNBleEvent.bleEvent, eventType: .stateEvent, value: state == .on, error: nil)
    }
    
    func didDiscoverDevice(_ device: DSBLEDevice) {
        /// 扫描获取到的设备
        print("didDiscoverDevice")
        device.debug()
        dispatchEvent(RNBleEvent.scanEvent,eventType: .scanResultEvent, value: device.asJSObject(), error: nil)
    }
    
    func didConnectDevice(_ device: DSBLEDevice) {
        /// 连接到的设备
        print("didConnectDevice")
        device.debug()
        dispatchEvent(RNBleEvent.bleEvent,eventType: .connectResultEvent, value: device.asJSObject(), error: nil)
        if device.type == .band {
            bandNotify()
        }
    }
    
    func didDisconnectDevice(_ device: DSBLEDevice) {
        /// 断开连接的设备
        print("didDisconnectDevice")
        device.debug()
        dispatchEvent(RNBleEvent.bleEvent,eventType: .disconnectResultEvent, value: device.asJSObject(), error: nil)
    }
    
    func connectDFUDevice(_ device: DSBLEDevice) {
        /// OTA 设备
        print("connectDFUDevice")
        device.debug()
        dispatchEvent(RNBleEvent.bleEvent,eventType: .otaEvent, value: device.asJSObject(), error: nil)
    }
    
    func restoreStateDict(_ dict: [String : Any]) {
        /// 恢复设备
        //        dispatchEvent(RNBleEvent.restoreStateEvent, value: dict, error: nil)
    }
}


// MARK: - 绑定事件
extension RNBleManager : DSBLEBindDelegate {
    
    func handleBindState(_ state: DSBLEBindingState) {
        dispatchEvent(RNBleEvent.bindEvent, eventType: .bindEvent, value: state.rawValue, error: nil)
    }
}

extension RNBleManager : DSBLESyncDelegate {
    
    func syncProgress(progress: Float) {
        
        dispatchEvent(RNBleEvent.syncEvent, eventType: .syncEvent, value: handlerSyncData(eventType: .progress, value: progress), error: nil)
    }
    
    func syncWillStart() {
        dispatchEvent(RNBleEvent.syncEvent, eventType: .syncEvent, value: handlerSyncData(eventType: .start, value: nil), error: nil)
    }
    
    func syncWillEnd() {
        dispatchEvent(RNBleEvent.syncEvent, eventType: .syncEvent, value: handlerSyncData(eventType: .end, value: nil), error: nil)
    }
    
    func syncError() {
        dispatchEvent(RNBleEvent.syncEvent, eventType: .syncEvent, value: handlerSyncData(eventType: .error, value: nil), error: nil)
    }
    
    func syncFinished(syncResultData syncData: DSBLESyncData?) {
        dispatchEvent(RNBleEvent.syncEvent, eventType: .syncEvent, value: handlerSyncData(eventType: .data, value: syncData), error: nil)
    }
    
    private func handlerSyncData(eventType: RNBleSyncTypes, value: Any?) -> [String : Any] {
        var data: Any? = nil
        switch eventType {
        case .progress:
            data = value ?? 0.0
        case .data:
            data = (value as? DSBLESyncData)?.asJSObject() ?? [:]
        default:
            data = NSNull()
        }
        return [
            "type": eventType.rawValue,
            "data": data!
        ]
    }
}

extension RNBleManager: DSBLEDFUDelegate {
    
    func DFUProgress(_ progress: Float) {
        dispatchEvent(RNBleEvent.otaEvent, eventType: .otaEvent, value: handlerOtaData(eventType: .progress, value: progress), error: nil)
    }
    
    func DFUStart() {
        dispatchEvent(RNBleEvent.otaEvent, eventType: .otaEvent, value: handlerOtaData(eventType: .start, value: nil), error: nil)
    }
    
    func DFUEnd() {
        dispatchEvent(RNBleEvent.otaEvent, eventType: .otaEvent, value: handlerOtaData(eventType: .end, value: nil), error: nil)
        bleManager.dfuDelegate = nil
    }
    
    func DFUError(_ error: String) {
        dispatchEvent(RNBleEvent.otaEvent, eventType: .otaEvent, value: handlerOtaData(eventType: .error, value: error), error: nil)
        bleManager.dfuDelegate = nil
    }
    
    private func handlerOtaData(eventType: RNBleOtaTypes, value: Any?) -> [String : Any] {
        var data: Any? = nil
        switch eventType {
        case .progress:
            data = value ?? 0.0
        case .error:
            data = value ?? ""
        default:
            data = NSNull()
        }
        return [
            "type": eventType.rawValue,
            "data": data!
        ]
    }
}

