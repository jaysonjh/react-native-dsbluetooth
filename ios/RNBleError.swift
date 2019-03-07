//
//  RNBleError.swift
//  RNDsbluetooth
//
//  Created by Jaysonj on 2019/2/18.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation

enum BleErrorCode : Int {
    case UnknownError = 0
    case BluetoothManagerDestroyed = 1
    case OperationCancelled = 2
    case OperationTimedOut = 3
    case OperationStartFailed = 4
    case InvalidIdentifiers = 5
    
    case BluetoothUnsupported = 100
    case BluetoothUnauthorized = 101
    case BluetoothPoweredOff = 102
    case BluetoothInUnknownState = 103
    case BluetoothResetting = 104
    case BluetoothStateChangeFailed = 105
    
    case DeviceConnectionFailed = 200
    case DeviceDisconnected = 201
    case DeviceRSSIReadFailed = 202
    case DeviceAlreadyConnected = 203
    case DeviceNotFound = 204
    case DeviceNotConnected = 205
    case DeviceMTUChangeFailed = 206
    
    case ServicesDiscoveryFailed = 300
    case IncludedServicesDiscoveryFailed = 301
    case ServiceNotFound = 302
    case ServicesNotDiscovered = 303
    
    case CharacteristicsDiscoveryFailed = 400
    case CharacteristicWriteFailed = 401
    case CharacteristicReadFailed = 402
    case CharacteristicNotifyChangeFailed = 403
    case CharacteristicNotFound = 404
    case CharacteristicsNotDiscovered = 405
    case CharacteristicInvalidDataFormat = 406
    
    case DescriptorsDiscoveryFailed = 500
    case DescriptorWriteFailed = 501
    case DescriptorReadFailed = 502
    case DescriptorNotFound = 503
    case DescriptorsNotDiscovered = 504
    case DescriptorInvalidDataFormat = 505
    
    case ScanStartFailed = 600
    case LocationServicesDisabled = 601
}


/// 蓝牙异常
struct RNBleError: Error {
    let errorCode: BleErrorCode
    let attErrorCode: Int?
    let iosErrorCode: Int?
    let reason: String?

    init(errorCode: BleErrorCode,
         reason: String? = nil,
         attErrorCode: Int? = nil,
         iosErrorCode: Int? = nil) {
        
        self.errorCode = errorCode
        self.reason = reason
        self.attErrorCode = attErrorCode
        self.iosErrorCode = iosErrorCode
    }
}

extension RNBleError {
    func asJSObject() -> [AnyHashable: Any] {
        return [
            "errorCode": self.errorCode.rawValue,
            "attErrorCode": self.attErrorCode.map {$0.description} ?? "null",
            "iosErrorCode": self.iosErrorCode.map {$0.description} ?? "null",
            "reason": self.reason ?? "null",
        ]
    }
}
