//
//  RNBleSendResultHandler.swift
//  RNDsbluetooth
//
//  Created by Jaysonj on 2019/2/20.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation

/**
 * {
 *   "command": 10,
 *   "data": any
 * }
 */
class RNBleResultHandler {
    
    static func sendBandResultHandler(event: RNBleSendType, data: Any?, success: Bool) -> [String:Any]? {
        switch event {
        case .active,
             .age,
             .alarm,
             .ancs,
             .antiLost,
             .antiStatus,
             .autoStep,
             .bind,
             .bloodPressure,
             .bright,
             .calorie,
             .camera,
             .clearData,
             .clear,
             .climate,
             .connect,
             .dfu,
             .dial,
             .display,
             .distance,
             .drink,
             .findBand,
             .findPhone,
             .gender,
             .hourSystem,
             .hrMonitor,
             .language,
             .motor,
             .musicControl,
             .musicStatu,
             .noSleep,
             .notification,
             .reboot,
             .reset,
             .restMode,
             .sedentary,
             .setDHR,
             .setRHR,
             .setPace,
             .sportInfo,
             .sportMode,
             .stepGoal,
             .target,
             .testHR,
             .testBP,
             .time,
             .timezone,
             .unit,
             .userInfo,
             .weather,
             .wristingTime:
            return [
                "command": event.rawValue,
                "data": success
            ]
        case .alertDistance:
            if let on = data as? DSBLEAlertDistance {
                return [
                    "command": event.rawValue,
                    "data": on.asJSObject()
                ]
            }
        case .alertType, .battery:
            if let on = data as? Int {
                return [
                    "command": event.rawValue,
                    "data": on
                ]
            }
        case .gsensor:
            if let on = data as? DSBLEGsensor {
                return [
                    "command": event.rawValue,
                    "data": on.asJSObject()
                ]
            }
        case .mac, .sn:
            if let on = data as? String {
                return [
                    "command": event.rawValue,
                    "data": on
                ]
            }
        case .version:
            if let on = data as? DSBLEVersion {
                return [
                    "command": event.rawValue,
                    "data": on.asJSObject()
                ]
            }
        default:
            ()
        }
        return nil
    }
}
