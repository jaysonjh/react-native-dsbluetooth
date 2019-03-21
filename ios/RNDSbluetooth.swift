//
//  RNDSbluetooth.swift
//  RNDsbluetooth
//
//  Created by Jaysonj on 2019/3/21.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation

@objc(RNDsbluetooth)
class RNDsbluetooth: RCTEventEmitter {
    var hasListeners = false
    var bleManager: RNBleManager? = nil
    
    deinit {
        bleManager?.destroy()
        bleManager = nil
        hasListeners = false
    }
    
    override func stopObserving() {
        hasListeners = false
    }
    
    override func startObserving() {
        hasListeners = true
    }
    
    override func supportedEvents() -> [String]! {
        return RNBleEvent.events
    }
    
    @objc
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    @objc(init:enableLog:)
    func initManager(restoreStateIdentifier: String, enableLog: Bool) {
        bleManager = RNBleManager.init(restoreStateIdentifier: restoreStateIdentifier, enableLog: enableLog)
        bleManager?.delegate = self
    }
    
    @objc(sdkVersion:reject:)
    func sdkVersion(_ resolve: @escaping Resolve, reject: @escaping Reject) {
        bleManager?.sdkVersion(resolve, reject: reject)
    }
    
    @objc(enableDebug:)
    func enableDebug(_ debug: Bool) {
        bleManager?.enableDebug(debug)
    }
    
    @objc(startScan:options:)
    func startScan(filter: Array<String>?, options: [String: Any]?) {
        var scanFilter: Set<String> = []
        filter?.forEach({ (it) in
            scanFilter.insert(it)
        })
        bleManager?.startScan(filter: scanFilter.isEmpty ? nil : scanFilter, options: options)
    }
    
    @objc(stopScan)
    func stopScan() {
        bleManager?.stopScan()
    }
    
    @objc(connect:mac:)
    func connect(identifier: String?, mac: String?) {
       bleManager?.connect(identifier: identifier, mac: mac)
    }
    
    @objc(disconnect:)
    func disconnect(identifier: String?) {
        bleManager?.disconnect(identifier: identifier)
    }
    
    @objc(state:)
    func state(_ resolve: @escaping Resolve) {
        bleManager?.state(resolve)
    }
    
    @objc(bandSend:data:resole:reject:)
    func bandSend(_ command: Int, data: Any?, resole: @escaping Resolve, reject:  @escaping Reject){
        bleManager?.bandSend(command, data: data, resole: resole, reject: reject)
    }
    
    @objc(bandSyncData)
    func bandSyncData() {
        bleManager?.bandSyncData()
    }
    
    @objc(bandBind)
    func bandBind() {
        bleManager?.bandBind()
    }
    
    @objc(bandDfu:resole:reject:)
    func bandDfu(_ dfuFile: Any, resole: @escaping Resolve, reject:  @escaping Reject) {
        bleManager?.bandDfu(dfuFile, resole: resole, reject: reject)
    }
    
    @objc(destroy)
    public func destroy() {
        bleManager?.destroy()
        bleManager = nil
    }
}

extension RNDsbluetooth: RNBleManagerDelegate {
    func dispatchEvent(_ name: String, value: Any?) {
        if hasListeners {
            sendEvent(withName: name, body: value)
        }
    }
}
