//
//  RNBleExtensions.swift
//  RNDsbluetooth
//
//  Created by Jaysonj on 2019/2/18.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation

extension DSBLEDevice {
    /// JS 对象
    ///
    /// - Returns: JS 对象
    func asJSObject() -> [String: Any] {
        return [
            "identifier": self.identifier,
            "mac": self.standardMac ?? "",
            "name": self.cbPeripheral.name ?? "",
            "rssi": self.rssi ?? -99,
            "isConnectable": true,
            "isDfu": self.state,
            "type": self.type.rawValue,
        ]
    }
    
    func debug() {
        let obj = asJSObject()
        print("Device: \(obj)")
    }
}

extension DSBLEVersion {
    /// JSON对象
    func asJSObject() -> [String: Any] {
        return [
            "version": self.version,
            "display": self.display,
            "vendor": self.vendor,
            "data": self.data
        ]
    }
}

extension DSBLEAlarm {
    
    func asJSObject() -> [String: Any] {
        return [
            "index": self.alarmNO,
            "time": self.alarmTime,
            "sunday": self.sundaySwitch,
            "monday": self.mondaySwitch,
            "tuesday": self.tuesdaySwitch,
            "wednesday": self.wednesdaySwitch,
            "thursday": self.thursdaySwitch,
            "friday": self.fridaySwitch,
            "saturday": self.saturdaySwitch,
            "switch": self.switchStatus,
        ]
    }
    
    static func asObject(dict: Dictionary<String,Any>) -> DSBLEAlarm {
        let alarm = DSBLEAlarm.init()
        alarm.alarmNO = (dict["index"] as? UInt) ?? 0
        alarm.alarmTime = (dict["time"] as? String) ?? "0800"
        alarm.switchStatus = (dict["switch"] as? Bool) ?? false
        alarm.sundaySwitch = (dict["sunday"] as? Bool) ?? false
        alarm.mondaySwitch = (dict["monday"] as? Bool) ?? false
        alarm.tuesdaySwitch = (dict["tuesday"] as? Bool) ?? false
        alarm.wednesdaySwitch = (dict["wednesday"] as? Bool) ?? false
        alarm.thursdaySwitch = (dict["thursday"] as? Bool) ?? false
        alarm.fridaySwitch = (dict["friday"] as? Bool) ?? false
        alarm.saturdaySwitch = (dict["saturday"] as? Bool) ?? false
        return alarm
    }
}

extension DSBLEAlertDistance {
    func asJSObject() -> [String: Any] {
        return [
            "farRange": self.farRange,
            "nearRange": self.nearRange,
        ]
    }
    
    static func asObject(dict: Dictionary<String,Any>) -> DSBLEAlertDistance {
        let distance = DSBLEAlertDistance.init()
        distance.farRange = (dict["farRange"] as? UInt) ?? 0
        distance.nearRange = (dict["nearRange"] as? UInt) ?? 0
        return distance
    }
}

extension DSBLEGsensor {
    func asJSObject() -> [String: Any] {
        return [
            "x": self.x,
            "y": self.y,
            "z": self.z,
        ]
    }
}

extension DSBLERestMode {
    static func asObject(dict: Dictionary<String,Any>) -> DSBLERestMode {
        let restMode = DSBLERestMode.init()
        restMode.swtich = (dict["switch"] as? Bool) ?? false
        restMode.startTime = RCTConvert.nsDate(dict["startTime"])
        restMode.endTime = RCTConvert.nsDate(dict["endTime"])
        return restMode
    }
}

extension DSBLEClimate {
    static func asObject(dict: Dictionary<String,Any>) -> DSBLEClimate {
        let climate = DSBLEClimate.init()
        climate.temperature = (dict["temperature"] as? Int) ?? 0
        climate.type =  DSBLETemperatureType.init(rawValue: (dict["type"] as? UInt) ?? 0) ?? .negative
        climate.weatherState = DSBLEWeatherState.init(rawValue: (dict["weatherState"] as? UInt) ?? 0) ?? .fine
        return climate
    }
}

extension DSBLESleepBlock {
    func asJSObject() -> [String: Any] {
        return [
            "type": self.type.rawValue,
            "value": self.value.rawValue,
            "time": self.time.timeIntervalSince1970
        ]
    }
}

extension DSBLESleepState {
    func asJSObject() -> [String: Any] {
        return [
            "state": self.state.rawValue,
            "beginTime": self.beginTime.timeIntervalSince1970,
            "endTime": self.endTime.timeIntervalSince1970,
        ]
    }
}

extension DSBLESleepInfo {
    func asJSObject() -> [String: Any] {
        var sleepState:[[String: Any]] = []
        self.sleepStates.forEach { (state) in
            sleepState.append(state.asJSObject())
        }
        return [
            "awakeDuration": self.awakeDuration,
            "beginTime": self.beginTime.timeIntervalSince1970,
            "endTime": self.endTime.timeIntervalSince1970,
            "deepSleepDuration": self.deepSleepDuration,
            "lightSleepDuration": self.lightSleepDuration,
            "sleepStates": sleepState,
        ]
    }
}

extension DSBLEStepInfo {
    func asJSObject() -> [String: Any] {
        return [
            "step": self.step,
            "type": self.type.rawValue,
            "endTime": self.time.timeIntervalSince1970,
            "startTime": self.starTtime.timeIntervalSince1970,
        ]
    }
}

extension DSBLEHeartrate {
    func asJSObject() -> [String: Any] {
        return [
            "time": self.time.timeIntervalSince1970,
            "bo": self.bo,
            "hr": self.hr,
            "type": self.type.rawValue
        ]
    }
}

extension DSBLEBloodPressure {
    func asJSObject() -> [String: Any] {
        return [
            "time": self.time.timeIntervalSince1970,
            "diastole": self.diastole,
            "systole": self.systole
        ]
    }
}

extension DSBLESport {
    func asJSObject() -> [String: Any] {
        return [
            "step": self.step,
            "sType": self.sType.rawValue,
            "time": self.time.timeIntervalSince1970,
            "type": self.type.rawValue
        ]
    }
}

extension DSBLESport2 {
    func asJSObject() -> [String: Any] {
        return [
            "cal": self.cal,
            "data": self.data,
            "endTime": self.endTime.timeIntervalSince1970,
            "startTime": self.startTime.timeIntervalSince1970,
            "sType": self.sType.rawValue,
        ]
    }
}

extension DSBLEDFUSet {
    
    static func asObejct(dict: Dictionary<String,Any>) -> DSBLEDFUSet {
        let dfuSet = DSBLEDFUSet.init()
        dfuSet.deviceMac = (dict["deviceMac"] as? String) ?? ""
        dfuSet.deviceName = (dict["deviceName"] as? String) ?? ""
        dfuSet.filePath = (dict["filePath"] as? String) ?? ""
        dfuSet.fileType = DSBLEOTAFileType.init(rawValue: (dict["fileType"] as? UInt8) ?? 0) ??  .framework
        return dfuSet
    }
}

extension DSBLESedentary {
    
    static func asObject(dict: Dictionary<String,Any>) -> DSBLESedentary {
        let sedentary = DSBLESedentary.init()
        sedentary.swtich = (dict["switch"] as? Bool) ?? false
        sedentary.sedentaryTime =  (dict["sedentaryTime"] as? UInt) ?? 0
        sedentary.startTime = RCTConvert.nsDate(dict["startTime"])
        sedentary.endTime = RCTConvert.nsDate(dict["endTime"])
        return sedentary
    }
}

extension DSBLEAppNotify {
    static func asObject(dict: Dictionary<String,Any>) -> DSBLEAppNotify {
        let notify = DSBLEAppNotify.init()
        dict.forEach { (key,value) in
            if let on = value as? Bool {
                notify.setAppNotify(key: key, value: on)
            }
        }
        return notify
    }
}

extension DSBLEWristingTime {
    static func asObject(dict: Dictionary<String,Any>) -> DSBLEWristingTime {
        let wristingTime = DSBLEWristingTime.init()
        wristingTime.startTime = RCTConvert.nsDate(dict["startTime"])
        wristingTime.endTime = RCTConvert.nsDate(dict["endTime"])
        wristingTime.wristingType = DSBLEWristingType.init(rawValue: (dict["wristingType"] as? UInt) ?? 0) ?? .off
        return wristingTime
    }
}

extension DSBLESportSet {
    static func asObject(dict: Dictionary<String,Any>) -> DSBLESportSet {
        let sportSet = DSBLESportSet.init()
        sportSet.state = DSBLESportState.init(rawValue: (dict["state"] as? UInt) ?? 0) ?? .stop
        sportSet.time = (dict["time"] as? UInt) ?? 0
        sportSet.type = DSBLESportType.init(rawValue: (dict["type"] as? UInt) ?? 0) ?? .normal
        return sportSet
    }
}

extension DSBLESportInfo {
    static func asObject(dict: Dictionary<String,Any>) -> DSBLESportInfo {
        let sportInfo = DSBLESportInfo.init()
        sportInfo.calorie = (dict["calorie"] as? UInt) ?? 0
        sportInfo.distance = (dict["distance"] as? UInt) ?? 0
        sportInfo.time = (dict["time"] as? UInt) ?? 0
        return sportInfo
    }
}

extension DSBLEBloodPressureSet {
    static func asObject(dict: Dictionary<String,Any>) -> DSBLEBloodPressureSet {
        let bpSet = DSBLEBloodPressureSet.init()
        bpSet.diastole = (dict["diastole"] as? UInt) ?? 0
        bpSet.systole = (dict["systole"] as? UInt) ?? 0
        bpSet.on = (dict["on"] as? Bool) ?? false
        return bpSet
    }
}

extension DSBLEVibrationSet {
    static func asObject(dict: Dictionary<String,Any>) -> DSBLEVibrationSet {
        let vSet = DSBLEVibrationSet.init()
        vSet.on = (dict["on"] as? Bool) ?? false
        vSet.type = DSBLEVibrationType.init(rawValue: (dict["type"] as? UInt) ?? 0) ?? .middle
        return vSet
    }
}

extension DSBLEUserInfo {
    static func asObject(dict: Dictionary<String,Any>) -> DSBLEUserInfo {
        let userinfo = DSBLEUserInfo.init()
        userinfo.age = (dict["age"] as? UInt) ?? 20
        userinfo.gender = DSBLEGender.init(rawValue: (dict["gender"] as? UInt) ?? 0) ?? .male
        userinfo.height = (dict["height"] as? UInt) ?? 170
        userinfo.weight = (dict["weight"] as? UInt) ?? 70
        return userinfo
    }
}

extension DSBLEWeather {
    static func asObject(dict: Dictionary<String,Any>) -> DSBLEWeather {
        let weather = DSBLEWeather.init()
        weather.aqi = (dict["aqi"] as? Int) ?? 170
        weather.temperature = (dict["temperature"] as? Int) ?? 170
        weather.type = DSBLETemperatureType.init(rawValue: (dict["type"] as? UInt) ?? 0) ?? .negative
        return weather
    }
}

extension DSBLEHRMonitor {
    static func asObject(dict: Dictionary<String,Any>) -> DSBLEHRMonitor {
        let hrMonitor = DSBLEHRMonitor.init()
        hrMonitor.interval = (dict["interval"] as? UInt) ?? 15
        hrMonitor.swtich = (dict["switch"] as? Bool) ?? false
        return hrMonitor
    }
}

extension DSBLEGPS {
    func asJSObject() -> Dictionary<String,Any> {
        
        return [
            "latitude": self.latitude,
            "longitude": self.longitude,
            "time": self.time.timeIntervalSince1970
        ]
    }
}

extension DSBLEPAIInfo {
    func asJSObject() -> Dictionary<String,Any> {
        return [
            "interval": self.interval,
            "time": self.time.timeIntervalSince1970,
            "type": self.type.rawValue,
            "value": self.value,
        ]
    }
}

extension DSBLEShoeStepInfo {
    func asJSObject() -> Dictionary<String,Any> {
        return [
            "duration": self.duration,
            "step": self.step,
            "type": self.type.rawValue,
            "time": self.time.timeIntervalSince1970
        ]
    }
}

extension DSBLESyncData {
    func asJSObject() -> Dictionary<String,Any> {
        var steps: [[String: Any]] = []
        self.steps.forEach { (step) in
            steps.append(step.asJSObject())
        }
        
        var hrs: [[String: Any]] = []
        self.heartratesAndBloodOxygens.forEach { (hr) in
            hrs.append(hr.asJSObject())
        }
        
        var sleeps: [[String: Any]] = []
        self.sleeps.forEach { (block) in
            sleeps.append(block.asJSObject())
        }
        
        var sports: [[String: Any]] = []
        self.sports.forEach { (sport) in
            sports.append(sport.asJSObject())
        }
        
        var sports2: [[String: Any]] = []
        self.sports2.forEach { (sport2) in
            sports2.append(sport2.asJSObject())
        }
        
        var bps: [[String: Any]] = []
        self.bloodPressures.forEach { (bp) in
            bps.append(bp.asJSObject())
        }
        
        var pais: [[String: Any]] = []
        self.pais.forEach { (pai) in
            pais.append(pai.asJSObject())
        }
        
        var gps: [[String: Any]] = []
        self.gps.forEach { (g) in
            gps.append(g.asJSObject())
        }
        
        var shoeSteps: [[String: Any]] = []
        self.shoeSteps.forEach { (shoeStep) in
            shoeSteps.append(shoeStep.asJSObject())
        }
        
        return [
            "steps" : steps,
            "heartrates": hrs,
            "sleeps": sleeps,
            "sports": sports,
            "sports2": sports2,
            "bloodPressuress": bps,
            "pais": pais,
            "gps": gps,
            "shoeSteps": shoeSteps
        ]
    }
}

