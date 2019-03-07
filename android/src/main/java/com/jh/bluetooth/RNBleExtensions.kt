package com.jh.bluetooth

import com.desay.dsbluetooth.data.enums.*
import com.desay.dsbluetooth.data.model.*
import com.desay.dsbluetooth.manager.keep.DSBLEDevice
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import java.util.Date
import kotlin.collections.HashMap

/**
 * 蓝牙库数据结构Builder
 */
object DSBLEObjectBuilder {
    fun createNewWeather(dict: HashMap<String, Any>): DSBLENewWeather {
        val temperature = (dict["temperature"] as? Int) ?: 0
        val type = if (((dict["type"] as? Int)
                        ?: 0) == 0) DSBLETemperatureType.negative else DSBLETemperatureType.positive
        val weatherState = DSBLEWeatherType.values().firstOrNull {
            it.type == ((dict["weatherState"] as? Int) ?: 0)
        }
                ?: DSBLEWeatherType.fine
        return DSBLENewWeather(type, temperature, weatherState)
    }

    fun createAlarm(dict: HashMap<String, Any>): DSBLEAlarm {
        val index = (dict["index"] as? Int) ?: 0
        val alarmTime = (dict["time"] as? String) ?: "0800"
        val switchStatus = (dict["switch"] as? Boolean) ?: false
        val sundaySwitch = (dict["sunday"] as? Boolean) ?: false
        val mondaySwitch = (dict["monday"] as? Boolean) ?: false
        val tuesdaySwitch = (dict["tuesday"] as? Boolean) ?: false
        val wednesdaySwitch = (dict["wednesday"] as? Boolean) ?: false
        val thursdaySwitch = (dict["thursday"] as? Boolean) ?: false
        val fridaySwitch = (dict["friday"] as? Boolean) ?: false
        val saturdaySwitch = (dict["saturday"] as? Boolean) ?: false
        return DSBLEAlarm(index, switchStatus, alarmTime, mondaySwitch, tuesdaySwitch,
                wednesdaySwitch, thursdaySwitch, fridaySwitch, saturdaySwitch, sundaySwitch)
    }

    fun createAlertDistance(dict: HashMap<String, Any>): DSBLEAlertDistance {
        val farRange = (dict["farRange"] as? Int) ?: 0
        val nearRange = (dict["nearRange"] as? Int) ?: 0
        return DSBLEAlertDistance(nearRange, farRange)
    }

    fun createRestMode(dict: HashMap<String, Any>): DSBLERestMode {
        val switch = (dict["switch"] as? Boolean) ?: false
        val startTime = Date(dict["startTime"] as? Long ?: 0)
        val endTime = Date(dict["endTime"] as? Long ?: 0)
        return DSBLERestMode(switch, startTime, endTime)
    }

    fun createDFUSet(dict: HashMap<String, Any>): DSBLEDFUSet {
        val deviceMac = (dict["deviceMac"] as? String) ?: ""
        val deviceName = (dict["deviceName"] as? String) ?: ""
        val filePath = (dict["filePath"] as? String) ?: ""
        val fileType = DSBLEOTAFileType.values().firstOrNull {
            it.con.toInt() == ((dict["fileType"] as? Int) ?: 0)
        } ?: DSBLEOTAFileType.Firmware
        return DSBLEDFUSet(deviceName,deviceMac,filePath,fileType)
    }

    fun createSedentary(dict: HashMap<String, Any>): DSBLESedentary {
        val switch = (dict["switch"] as? Boolean) ?: false
        val sedentaryTime = (dict["sedentaryTime"] as? Int) ?: 0
        val startTime = Date(dict["startTime"] as? Long ?: 0)
        val endTime = Date(dict["endTime"] as? Long ?: 0)
        return DSBLESedentary(sedentaryTime,switch,startTime,endTime)
    }

    fun createWristingTime(dict: HashMap<String, Any>): DSBLEWristingTime {
        val startTime = Date(dict["startTime"] as? Long ?: 0)
        val endTime = Date(dict["endTime"] as? Long ?: 0)
        val wristingType = DSBLEWristingType.values().firstOrNull { it.type == ((dict["wristingType"] as? Int)
            ?: 0)} ?: DSBLEWristingType.off
        return DSBLEWristingTime(wristingType,startTime, endTime)
    }

    fun createSportSet(dict: HashMap<String, Any>): DSBLESportSet {
        val time = (dict["time"] as? Int) ?: 0
        val state = DSBLESportState.values().firstOrNull { it.type ==  (dict["state"] as? Int) ?: 0} ?: DSBLESportState.stop
        val type = DSBLESportType.values().firstOrNull { it.type == (dict["type"] as? Int) ?: 0 } ?: DSBLESportType.Normal
        return DSBLESportSet(state, type, time)
    }

    fun createSportInfo(dict: HashMap<String, Any>): DSBLESportInfo {
        val calorie = (dict["calorie"] as? Int) ?: 0
        val distance = (dict["distance"] as? Int) ?: 0
        val time = (dict["time"] as? Int) ?: 0
        return DSBLESportInfo(time, distance, calorie)
    }

    fun createBloodPressureSet(dict: HashMap<String, Any>): DSBLEBloodPressureSet {
        val diastole = (dict["diastole"] as? Int) ?: 0
        val systole = (dict["systole"] as? Int) ?: 0
        val on = (dict["on"] as? Boolean) ?: false
        return DSBLEBloodPressureSet(on, systole, diastole)
    }

    fun createVibrationSet(dict: HashMap<String, Any>): DSBLEVibrationSet {
        val on = (dict["on"] as? Boolean) ?: false
        val type = DSBLEVibrationType.values().firstOrNull { it.type ==  (dict["type"] as? Int) ?: 0} ?: DSBLEVibrationType.middle
        return DSBLEVibrationSet(type, on)
    }

    fun createUserInfo(dict: HashMap<String, Any>): DSBLEUserInfo {
        val age = (dict["age"] as? Int) ?: 20
        val gender = DSBLEGender.values().firstOrNull { it.type == (dict["gender"] as? Int) ?: 0 } ?: DSBLEGender.male
        val height = (dict["height"] as? Int) ?: 170
        val weight = (dict["weight"] as? Int) ?: 70
        return DSBLEUserInfo(height, weight, gender, age)
    }

    fun createWeather(dict: HashMap<String, Any>): DSBLEWeather {
        val aqi = (dict["aqi"] as? Int) ?: 170
        val temperature = (dict["temperature"] as? Int) ?: 170
        val type = DSBLETemperatureType.values().firstOrNull { it.type ==  (dict["type"] as? UInt) ?: 0} ?: DSBLETemperatureType.negative
        return DSBLEWeather(aqi, type, temperature)
    }

    fun createHRMonitor(dict: HashMap<String, Any>): DSBLEHRMonitor {
        val interval = (dict["interval"] as? Int) ?: 15
        val switch = (dict["switch"] as? Boolean) ?: false
        return DSBLEHRMonitor(switch, interval)
    }

    fun createPush(dict: HashMap<String, Any>): DSBLEPushData {
        val chinese = (dict["isChinese"] as? Boolean) ?: false
        val msg = (dict["msg"] as? String)
        val time = (dict["time"] as? Int) ?: 3
        val type = DSBLEPushType.values().firstOrNull { it.type ==  (dict["type"] as? Int) ?: 0} ?: DSBLEPushType.sms
        return DSBLEPushData(chinese,msg,time,type)
    }
}

fun DSBLEDevice.asJSObject(): WritableMap {
    val result = Arguments.createMap()
    result.putString("mac", this.address)
    result.putString("name",this.device.name)
    result.putInt("rssi", this.rssi ?: -99)
    result.putBoolean("isConnectable", true)
    result.putBoolean("isDfu", this.ota)
    result.putString("type", this.type.con)
    return result
}

fun DSBLEVersion.asJSObject(): WritableMap {
    val result = Arguments.createMap()
    result.putInt("version", this.version)
    result.putString("display", this.display)
    result.putString("vendor", this.vendor)
    result.putString("data", this.data)
    return result
}

fun DSBLEAlarm.asJSObject(): WritableMap {
    val result = Arguments.createMap()
    result.putInt("index", this.alarmNO)
    result.putString("time", this.alarmTime)
    result.putBoolean("sunday", this.sundaySwitch)
    result.putBoolean("monday", this.mondaySwitch)
    result.putBoolean("tuesday", this.tuesdaySwitch)
    result.putBoolean("wednesday", this.wednesdaySwitch)
    result.putBoolean("thursday", this.thursdaySwitch)
    result.putBoolean("friday", this.fridaySwitch)
    result.putBoolean("saturday", this.saturdaySwitch)
    result.putBoolean("switch", this.switchStatus)
    return result
}

fun DSBLEAlertDistance.asJSObject(): WritableMap {
    val result = Arguments.createMap()
    result.putInt("farRange", this.farRange)
    result.putInt("nearRange", this.nearRange)
    return result
}

fun DSBLEGsensor.asJSObject(): WritableMap {
    val result = Arguments.createMap()
    result.putInt("x", this.x)
    result.putInt("y", this.y)
    result.putInt("z", this.z)
    return result
}

fun DSBLESleepBlock.asJSObject(): WritableMap {
    val result = Arguments.createMap()
    result.putInt("type", this.type.type)
    result.putInt("value", this.value.type)
    result.putInt("time", (this.time.time / 1000L).toInt())
    return result
}

fun DSBLESleepState.asJSObject(): WritableMap {
    val result = Arguments.createMap()
    result.putInt("state", this.state.type)
    result.putInt("beginTime", (this.beginTime.time / 1000L).toInt())
    result.putInt("endTime", (this.endTime.time / 1000L).toInt())
    return result
}

fun DSBLESleepInfo.asJSObject(): WritableMap {
    val result = Arguments.createMap()
    val stateArray = Arguments.createArray()
    this.sleepStates.forEach {
        stateArray.pushMap(it.asJSObject())
    }
    result.putInt("awakeDuration", this.awakeDuration)
    result.putInt("deepSleepDuration", this.deepSleepDuration)
    result.putInt("lightSleepDuration", this.lightSleepDuration)
    result.putInt("beginTime", (this.beginTime.time / 1000L).toInt())
    result.putInt("endTime", (this.endTime.time / 1000L).toInt())
    result.putArray("sleepStates", stateArray)
    return result
}

fun DSBLEStepInfo.asJSObject(): WritableMap {
    val result = Arguments.createMap()
    result.putInt("step", this.step)
    result.putInt("type", this.type.type)
    result.putInt("endTime", (this.time.time / 1000L).toInt())
    result.putInt("startTime", (this.startTime.time / 1000L).toInt())
    return result
}

fun DSBLEHeartrate.asJSObject(): WritableMap {
    val result = Arguments.createMap()
    result.putInt("hr", this.hr)
    result.putInt("bo", this.bo)
    result.putInt("type", this.type.type)
    result.putInt("time", (this.time.time / 1000L).toInt())
    return result
}

fun DSBLEBloodPressure.asJSObject(): WritableMap {
    val result = Arguments.createMap()
    result.putInt("diastole", this.diastole)
    result.putInt("systole", this.systole)
    result.putInt("time", (this.time.time / 1000L).toInt())
    return result
}

fun DSBLESport.asJSObject(): WritableMap {
    val result = Arguments.createMap()
    result.putInt("step", this.step)
    result.putInt("sType", this.sType.type)
    result.putInt("time", (this.time.time / 1000L).toInt())
    result.putInt("type", this.type.type)
    return result
}

fun DSBLESport2.asJSObject(): WritableMap {
    val result = Arguments.createMap()
    result.putInt("data", this.data)
    result.putInt("cal", this.cal)
    result.putInt("sType", this.sType.type)
    result.putInt("endTime", (this.endTime.time / 1000L).toInt())
    result.putInt("startTime", (this.startTime.time / 1000L).toInt())
    return result
}

fun DSBLEGPS.asJSObject(): WritableMap {
    val result = Arguments.createMap()
    result.putDouble("latitude",this.latitude)
    result.putDouble("longitude",this.longitude)
    result.putInt("time",(this.time.time / 1000L).toInt())
    return result
}

fun DSBLEPAIInfo.asJSObject(): WritableMap {
    val result = Arguments.createMap()
    result.putInt("interval",this.interval)
    result.putInt("type",this.type.type)
    result.putInt("time",(this.time.time / 1000L).toInt())
    result.putInt("value",this.value)
    return result
}

fun DSBLEShoeStepInfo.asJSObject(): WritableMap {
    val result = Arguments.createMap()
    result.putInt("step", this.step)
    result.putInt("type", this.type.type)
    result.putInt("time", (this.time.time / 1000L).toInt())
    result.putInt("duration", this.duration)
    return result
}

fun DSBLESyncData.asJSObject(): WritableMap {
    val result = Arguments.createMap()
    val steps = Arguments.createArray()
    this.steps.forEach { steps.pushMap(it.asJSObject()) }
    val hrs = Arguments.createArray()
    this.heartratesAndBloodOxygens.forEach { hrs.pushMap(it.asJSObject()) }
    val sleeps = Arguments.createArray()
    this.sleeps.forEach { sleeps.pushMap(it.asJSObject()) }
    val sports = Arguments.createArray()
    this.sports.forEach { sports.pushMap(it.asJSObject()) }
    val sports2 = Arguments.createArray()
    this.sports2.forEach { sports2.pushMap(it.asJSObject()) }
    val bps = Arguments.createArray()
    this.bloodPressures.forEach { bps.pushMap(it.asJSObject()) }
    val pais = Arguments.createArray()
    this.pais.forEach { pais.pushMap(it.asJSObject()) }
    val gps = Arguments.createArray()
    this.gps.forEach { gps.pushMap(it.asJSObject()) }
    val shoeSteps = Arguments.createArray()
    this.shoeSteps.forEach { shoeSteps.pushMap(it.asJSObject()) }

    result.putArray("steps",steps)
    result.putArray("heartrates",hrs)
    result.putArray("sleeps",sleeps)
    result.putArray("sports",sports)
    result.putArray("sports2",sports2)
    result.putArray("bloodPressuress",bps)
    result.putArray("pais",pais)
    result.putArray("gps",gps)
    result.putArray("shoeSteps",shoeSteps)
    return result
}










