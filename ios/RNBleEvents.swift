//
//  RNBleEvents.swift
//  RNDsbluetooth
//
//  Created by Jaysonj on 2019/2/17.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation

enum RNBleSyncTypes: Int {
    /**
     * 同步开始
     */
    case start = 1
    /**
     * 同步进度
     */
    case progress = 2
    /**
     * 同步结束
     */
    case end = 3
    /**
     * 同步异常
     */
    case error = 4
    /**
     * 同步数据返回
     */
    case data = 5
}

enum RNBleOtaTypes: Int {
    /**
     * 同步开始
     */
    case start = 1
    /**
     * 同步进度
     */
    case progress = 2
    /**
     * 同步结束
     */
    case end = 3
    /**
     * 同步异常
     */
    case error = 4
}

enum RNBleEventTypes: Int {
    /**
     * 扫描事件类型，对应了BleDevice数据
     * Native->RN
     */
    case scanResultEvent = 100
    
    /**
     * 连接事件类型，对应了BleDevice数据
     * Native->RN
     */
    case connectResultEvent = 101
    
    /**
     * 连接断开事件类型，对应了BleDevice数据
     * Native->RN
     */
    case disconnectResultEvent = 102
    
    /**
     * 接收事件类型，对应了BleNotifyResult数据类型
     * Native->RN
     */
    case notifyEvent = 103
    
    /**
     * 同步数据事件类型，对应了BleSyncResult数据类型
     * RN->Native
     */
    case syncEvent = 104
    
    /**
     * 系统蓝牙状态事件类型，对应了BleStateResult数据类型
     */
    case stateEvent = 105
    
    /**
     * 升级模式
     */
    case otaEvent = 106
    
    /**
     * 绑定
     */
    case bindEvent = 107
}


@objc
public class RNBleEvent: NSObject {
    
    @objc
    static public let scanEvent = "ScanEvent"
    
    @objc
    static public let bleEvent = "BleEvent"
    
    @objc
    static public let syncEvent = "SyncEvent"
    
    @objc
    static public let bindEvent = "BindEvent"
    
    @objc
    static public let notifyEvent = "NotifyEvent"
    
    @objc
    static public let otaEvent = "OtaEvent"
    
    @objc
    static public let events = [
        scanEvent,
        bleEvent,
        syncEvent,
        bindEvent,
        notifyEvent,
        otaEvent,
    ]
}
