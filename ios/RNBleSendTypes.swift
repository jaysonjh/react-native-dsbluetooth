//
//  RNBleSendTypes.swift
//  RNDsbluetooth
//
//  Created by Jaysonj on 2019/2/20.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation

enum RNBleSendType :Int {
    /// 通用指令
    case common = 1
    
    /// 闹钟
    case alarm = 2
    
    /// 目标
    case target = 3
    
    /// iOS ANCS
    case notification = 4
    
    /// 版本号
    case version = 5
    
    /// 重启
    case reboot = 6
    
    /// 绑定
    case bind = 7
    
    /// 个人信息
    case userInfo = 8
    
    /// 电量
    case battery = 9
    
    /// 自动步数上报
    case autoStep = 10
    
    /// 语言
    case language = 11
    
    /// 抬手显示
    case wristingTime = 12
    
    /// 久坐提醒
    case sedentary = 13
    
    /// 找手环
    case findBand = 14
    
    /// 激活
    case active = 15
    
    /// 时间
    case time = 16
    
    /// 时区
    case timezone = 17
    
    /// OTA
    case dfu = 18
    
    /// 测试心率
    case testHR = 19
    
    /// 同步
    case sync = 20
    
    /// 摄像头
    case camera = 21
    
    /// 找手机
    case findPhone = 22
    
    /// 音乐控制
    case musicControl = 23
    
    /// 单位
    case unit = 24
    
    /// 智能防丢
    case antiLost = 25
    
    /// 心率监测
    case hrMonitor = 26
    
    /// 音乐状态
    case musicStatu = 27
    
    /// 24小时
    case hourSystem = 28
    
    /// 专项运动
    case sportMode = 29
    
    /// 设置步数
    case setPace = 30
    
    /// 防睡眠
    case noSleep = 31
    
    /// 设置静态心率
    case setRHR = 32
    
    /// 设置动态心率
    case setDHR = 33
    
    /// 获取Gsensor
    case gsensor = 34
    
    /// 血压设置
    case bloodPressure = 35
    
    /// ANCS
    case ancs = 36
    
    /// 运动信息
    case sportInfo = 37
    
    /// 震动
    case motor = 38
    
    /// 恢复出厂设置
    case reset = 39
    
    /// 横竖屏显示
    case display = 40
    
    /// 性别
    case gender = 41
    
    /// 清空数据
    case clearData = 42
    
    /// SN号
    case sn = 43
    
    /// 测试血压
    case testBP = 44
    
    /// 连接开关设置
    case connect = 45
    
    /// 体制秤单位切换
    case wUnit = 46
    
    /// 孕妇模式
    case pregnant = 47
    
    /// 防丢器状态
    case antiStatus = 48
    
    /// 距离提醒
    case alertDistance = 49
    
    /// 距离提醒类型
    case alertType = 50
    
    /// 休息模式
    case restMode = 51
    
    /// 天气(AQI)
    case weather = 52
    
    /// 卡路里提醒
    case calorie = 53
    
    /// 距离提醒
    case distance = 54
    
    /// 喝水提醒
    case drink = 55
    
    /// 表盘
    case dial = 56
    
    /// 年龄
    case age = 57
    
    /// 亮度设置
    case bright = 58
    
    /// 步数目标
    case stepGoal = 59
    
    /// 钓鱼 CAST
    case cast = 60
    
    /// 开始钓鱼
    case fish = 61
    
    /// 天气
    case climate = 62
    
    /// 钓鱼同步区间
    case syncPeriod = 63
    
    /// 清空数据
    case clear = 64
    
    /// 信息显示
    case textDisplay = 65
    
    /// mac地址
    case mac = 66
}

extension RNBleSendType {
    func toNativeBandCommandType() -> DSBLEBandFuncType {
        switch self {
        case .active:
            return .active
        case .age:
            return .age
        case .alarm:
            return .alarm
        case .alertDistance:
            return .alertDistance
        case .alertType:
            return .alertType
        case .ancs:
            return .ancs
        case .antiLost:
            return .antiLost
        case .antiStatus:
            return .antiStatus
        case .autoStep:
            return .autoStep
        case .battery:
            return .battery
        case .bind:
            return .bind
        case .bloodPressure:
            return .bloodPressure
        case .bright:
            return .bright
        case .calorie:
            return .calorie
        case .camera:
            return .camera
        case .clearData:
            return .clearData
        case .climate:
            return .climate
        case .connect:
            return .connect
        case .dfu:
            return .dfu
        case .dial:
            return .dial
        case .display:
            return .display
        case .distance:
            return .distance
        case .drink:
            return .drink
        case .findBand:
            return .findBand
        case .findPhone:
            return .findPhone
        case .gender:
            return .gender
        case .gsensor:
            return .gsensor
        case .hourSystem:
            return .hourSystem
        case .hrMonitor:
            return .hrMonitor
        case .language:
            return .language
        case .mac:
            return .mac
        case .motor:
            return .motor
        case .musicControl:
            return .musicControl
        case .musicStatu:
            return .musicStatu
        case .noSleep:
            return .noSleep
        case .notification:
            return .notification
        case .reboot:
            return .reboot
        case .reset:
            return .reset
        case .restMode:
            return .restMode
        case .sedentary:
            return .sedentary
        case .setDHR:
            return .setDHR
        case .setPace:
            return .setPace
        case .setRHR:
            return .setRHR
        case .sn:
            return .sn
        case .sportInfo:
            return .sportInfo
        case .sportMode:
            return .sportMode
        case .stepGoal:
            return .stepGoal
        case .sync:
            return .sync
        case .target:
            return .target
        case .testBP:
            return .testBP
        case .testHR:
            return .testHR
        case .textDisplay:
            return .textDisplay
        case .time:
            return .time
        case .timezone:
            return .timezone
        case .unit:
            return .unit
        case .userInfo:
            return .userInfo
        case .version:
            return .version
        case .weather:
            return .weather
        case .wristingTime:
            return .wristingTime
        default:
            return .common
        }
    }
}

extension RNBleSendType {
    
    func toJSBandValue(_ value: Any?) -> Any? {
        switch self {
            case .sn:
                return value;
            case .mac:
                return value;
            case .battery:
                return value;
            case .alertDistance:
                return (value as? DSBLEAlertDistance)?.asJSObject() ?? nil
            case .gsensor:
                return (value as? DSBLEGsensor)?.asJSObject() ?? nil
            case .version:
                return (value as? DSBLEVersion)?.asJSObject() ?? nil
            default:
                return value != nil
        }
    }
    
    func toNativeBandSendValue(_ value: Any?) -> Any? {
        switch self {
        case .alarm:
            if let on = value as? Dictionary<String,Any> {
                return DSBLEAlarm.asObject(dict: on)
            }
            return nil
        case .alertDistance:
            if let on = value as? Dictionary<String,Any> {
                return DSBLEAlertDistance.asObject(dict: on)
            }
            return nil
        case .ancs, .notification:
            if let on = value as? Dictionary<String,Any> {
                return DSBLEAppNotify.asObject(dict: on)
            }
            return nil
        case .restMode:
            if let on = value as? Dictionary<String,Any> {
                return DSBLERestMode.asObject(dict: on)
            }
            return nil
        case .sedentary:
            if let on = value as? Dictionary<String,Any> {
                return DSBLESedentary.asObject(dict: on)
            }
            return nil
        case .userInfo:
            if let on = value as? Dictionary<String,Any> {
                return DSBLEUserInfo.asObject(dict: on)
            }
            return nil
            
        case .weather:
            if let on = value as? Dictionary<String,Any> {
                return DSBLEWeather.asObject(dict: on)
            }
            return nil
            
        case .hrMonitor:
            if let on = value as? Dictionary<String,Any> {
                return DSBLEHRMonitor.asObject(dict: on)
            }
            return nil
            
        case .motor:
            if let on = value as? Dictionary<String,Any> {
                return DSBLEVibrationSet.asObject(dict: on)
            }
            return nil
            
        case .sportMode:
            if let on = value as? Dictionary<String,Any> {
                return DSBLESportSet.asObject(dict: on)
            }
            return nil
            
        case .sportInfo:
            if let on = value as? Dictionary<String,Any> {
                return DSBLESportInfo.asObject(dict: on)
            }
            return nil
            
        case .wristingTime:
            if let on = value as? Dictionary<String,Any> {
                return DSBLEWristingTime.asObject(dict: on)
            }
            return nil
            
        case .bloodPressure:
            if let on = value as? Dictionary<String,Any> {
                return DSBLEBloodPressureSet.asObject(dict: on)
            }
            return nil
            
        case .climate:
            if let on = value as? Dictionary<String,Any> {
                return DSBLEClimate.asObject(dict: on)
            }
            return nil
        case .time:
            if let on = value as? Int {
                return Date.init(timeIntervalSince1970: TimeInterval.init(on/1000))
            }
            return nil
        case .dfu:
            if let on = value as? Dictionary<String,Any> {
                return DSBLEDFUSet.asObejct(dict: on)
            }
            return nil
        default:
            return value
        }
    }
}
