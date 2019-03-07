package com.jh.bluetooth

import com.desay.dsbluetooth.data.DSBLEBandFuncType
import com.desay.dsbluetooth.data.model.*
import com.facebook.react.bridge.Dynamic
import com.facebook.react.bridge.ReadableMap
import java.util.*

enum class RNBleSendType(val type: Int) {
    /// 通用指令
    Common(1),

    /// 闹钟
    Alarm(2),

    /// 目标
    Target(3),

    /// iOS ANCS/ Android for push
    Notification(4),

    /// 版本号
    Version(5),

    /// 重启
    Reboot(6),

    /// 绑定
    Bind(7),

    /// 个人信息
    UserInfo(8),

    /// 电量
    Battery(9),

    /// 自动步数上报
    AutoStep(10),

    /// 语言
    Language(11),

    /// 抬手显示
    WristingTime(12),

    /// 久坐提醒
    Sedentary(13),

    /// 找手环
    FindBand(14),

    /// 激活
    Active(15),

    /// 时间
    Time(16),

    /// 时区
    Timezone(17),

    /// OTA
    Dfu(18),

    /// 测试心率
    TestHR(19),

    /// 同步
    Sync(20),

    /// 摄像头
    Camera(21),

    /// 找手机
    FindPhone(22),

    /// 音乐控制
    MusicControl(23),

    /// 单位
    Unit(24),

    /// 智能防丢
    AntiLost(25),

    /// 心率监测
    HrMonitor(26),

    /// 音乐状态
    MusicStatu(27),

    /// 24小时
    HourSystem(28),

    /// 专项运动
    SportMode(29),

    /// 设置步数
    SetPace(30),

    /// 防睡眠
    NoSleep(31),

    /// 设置静态心率
    SetRHR(32),

    /// 设置动态心率
    SetDHR(33),

    /// 获取Gsensor
    GSensor(34),

    /// 血压设置
    BloodPressure(35),

    /// ANCS for ios
    ANCS(36),

    /// 运动信息
    SportInfo(37),

    /// 震动
    Motor(38),

    /// 恢复出厂设置
    Reset(39),

    /// 横竖屏显示
    Display(40),

    /// 性别
    Gender(41),

    /// 清空数据
    ClearData(42),

    /// SN号
    Sn(43),

    /// 测试血压
    TestBP(44),

    /// 连接开关设置
    Connect(45),

    /// 体制秤单位切换
    WUnit(46),

    /// 孕妇模式
    Pregnant(47),

    /// 防丢器状态
    AntiStatus(48),

    /// 距离提醒
    AlertDistance(49),

    /// 距离提醒类型
    AlertType(50),

    /// 休息模式
    RestMode(51),

    /// 天气(AQI)
    Weather(52),

    /// 卡路里提醒
    Calorie(53),

    /// 距离提醒
    Distance(54),

    /// 喝水提醒
    Drink(55),

    /// 表盘
    Dial(56),

    /// 年龄
    Age(57),

    /// 亮度设置
    Bright(58),

    /// 步数目标
    StepGoal(59),

    /// 钓鱼 CAST
    Cast(60),

    /// 开始钓鱼
    Fish(61),

    /// 天气
    Climate(62),

    /// 钓鱼同步区间
    SyncPeriod(63),

    /// 清空数据
    Clear(64),

    /// 信息显示
    TextDisplay(65),

    /// mac地址
    Mac(66)
}

fun toNativeBandCommandType(type: RNBleSendType): DSBLEBandFuncType {
    when (type) {
        RNBleSendType.Active -> return DSBLEBandFuncType.active
        RNBleSendType.Age -> return DSBLEBandFuncType.age
        RNBleSendType.Alarm -> return DSBLEBandFuncType.alarm
        RNBleSendType.AlertDistance -> return DSBLEBandFuncType.alertDistance
        RNBleSendType.AlertType -> return DSBLEBandFuncType.alertType
        RNBleSendType.AntiLost -> return DSBLEBandFuncType.antiLost
        RNBleSendType.AntiStatus -> return DSBLEBandFuncType.antiStatus
        RNBleSendType.AutoStep -> return DSBLEBandFuncType.autoStep
        RNBleSendType.Battery -> return DSBLEBandFuncType.battery
        RNBleSendType.Bind -> return DSBLEBandFuncType.bind
        RNBleSendType.BloodPressure -> return DSBLEBandFuncType.bloodPressure
        RNBleSendType.Bright -> return DSBLEBandFuncType.bright
        RNBleSendType.Calorie -> return DSBLEBandFuncType.calorie
        RNBleSendType.Camera -> return DSBLEBandFuncType.camera
        RNBleSendType.ClearData -> return DSBLEBandFuncType.clearData
        RNBleSendType.Climate -> return DSBLEBandFuncType.newWeather
        RNBleSendType.Connect -> return DSBLEBandFuncType.connect
        RNBleSendType.Dfu -> return DSBLEBandFuncType.dfu
        RNBleSendType.Dial -> return DSBLEBandFuncType.dial
        RNBleSendType.Display -> return DSBLEBandFuncType.display
        RNBleSendType.Distance -> return DSBLEBandFuncType.distance
        RNBleSendType.Drink -> return DSBLEBandFuncType.drink
        RNBleSendType.FindBand -> return DSBLEBandFuncType.findBand
        RNBleSendType.FindPhone -> return DSBLEBandFuncType.findPhone
        RNBleSendType.Gender -> return DSBLEBandFuncType.gender
        RNBleSendType.GSensor -> return DSBLEBandFuncType.gsensor
        RNBleSendType.HourSystem -> return DSBLEBandFuncType.hourSystem
        RNBleSendType.HrMonitor -> return DSBLEBandFuncType.hrMonitor
        RNBleSendType.Language -> return DSBLEBandFuncType.language
        RNBleSendType.Motor -> return DSBLEBandFuncType.motor
        RNBleSendType.MusicControl -> return DSBLEBandFuncType.musicControl
        RNBleSendType.MusicStatu -> return DSBLEBandFuncType.musicStatu
        RNBleSendType.NoSleep -> return DSBLEBandFuncType.noSleep
        RNBleSendType.Notification -> return DSBLEBandFuncType.push
        RNBleSendType.Reboot -> return DSBLEBandFuncType.reboot
        RNBleSendType.Reset -> return DSBLEBandFuncType.reset
        RNBleSendType.RestMode -> return DSBLEBandFuncType.restMode
        RNBleSendType.Sedentary -> return DSBLEBandFuncType.sedentary
        RNBleSendType.SetDHR -> return DSBLEBandFuncType.setDHR
        RNBleSendType.SetPace -> return DSBLEBandFuncType.setPace
        RNBleSendType.SetRHR -> return DSBLEBandFuncType.setRHR
        RNBleSendType.Sn -> return DSBLEBandFuncType.sn
        RNBleSendType.SportInfo -> return DSBLEBandFuncType.sportInfo
        RNBleSendType.SportMode -> return DSBLEBandFuncType.sportMode
        RNBleSendType.StepGoal -> return DSBLEBandFuncType.stepGoal
        RNBleSendType.Sync -> return DSBLEBandFuncType.sync
        RNBleSendType.Target -> return DSBLEBandFuncType.target
        RNBleSendType.TestBP -> return DSBLEBandFuncType.bloodPressure
        RNBleSendType.TestHR -> return DSBLEBandFuncType.testHR
        RNBleSendType.TextDisplay -> return DSBLEBandFuncType.pshswscreen
        RNBleSendType.Time -> return DSBLEBandFuncType.time
        RNBleSendType.Timezone -> return DSBLEBandFuncType.timezone
        RNBleSendType.Unit -> return DSBLEBandFuncType.unit
        RNBleSendType.UserInfo -> return DSBLEBandFuncType.userInfo
        RNBleSendType.Version -> return DSBLEBandFuncType.version
        RNBleSendType.Weather -> return DSBLEBandFuncType.weather
        RNBleSendType.WristingTime -> return DSBLEBandFuncType.wristingTime
        else -> return DSBLEBandFuncType.common
    }
}

fun toJSBandValue(type: RNBleSendType, value: Any?): Any? {
    when (type) {
        RNBleSendType.Sn -> return value
        RNBleSendType.Mac -> return value
        RNBleSendType.Battery -> return value
        RNBleSendType.AlertDistance -> return (value as? DSBLEAlertDistance)?.asJSObject()
        RNBleSendType.GSensor -> return (value as? DSBLEGsensor)?.asJSObject()
        RNBleSendType.Version -> return (value as? DSBLEVersion)?.asJSObject()
        else -> return value != null
    }
}


fun toNativeBandSendValue(type: RNBleSendType, value: Dynamic?): Any? {
    when (type) {
        RNBleSendType.Alarm -> {
            val on = value?.asMap()
            if (on != null) {
                return DSBLEObjectBuilder.createAlarm(on.toHashMap())
            }
            return null
        }
        RNBleSendType.AlertDistance -> {
            val on = value?.asMap()
            if (on != null) {
                return DSBLEObjectBuilder.createAlertDistance(on.toHashMap())
            }
            return null
        }
        RNBleSendType.Notification -> {
            val on = value?.asMap()
            if (on != null) {
                return DSBLEObjectBuilder.createPush(on.toHashMap())
            }
            return null
        }
        RNBleSendType.RestMode -> {
            val on = value?.asMap()
            if (on != null) {
                return DSBLEObjectBuilder.createRestMode(on.toHashMap())
            }
            return null
        }
        RNBleSendType.Sedentary
        -> {
            val on = value?.asMap()
            if (on != null) {
                return DSBLEObjectBuilder.createSedentary(on.toHashMap())
            }
            return null
        }
        RNBleSendType.UserInfo -> {
            val on = value?.asMap()
            if (on != null) {
                return DSBLEObjectBuilder.createUserInfo(on.toHashMap())
            }
            return null
        }
        RNBleSendType.Weather -> {
            val on = value?.asMap()
            if (on != null) {
                return DSBLEObjectBuilder.createWeather(on.toHashMap())
            }
            return null
        }
        RNBleSendType.HrMonitor -> {
            val on = value?.asMap()
            if (on != null) {
                return DSBLEObjectBuilder.createHRMonitor(on.toHashMap())
            }
            return null
        }
        RNBleSendType.Motor -> {
            val on = value?.asMap()
            if (on != null) {
                return DSBLEObjectBuilder.createVibrationSet(on.toHashMap())
            }
            return null
        }
        RNBleSendType.SportMode -> {
            val on = value?.asMap()
            if (on != null) {
                return DSBLEObjectBuilder.createSportSet(on.toHashMap())
            }
            return null
        }
        RNBleSendType.SportInfo -> {
            val on = value?.asMap()
            if (on != null) {
                return DSBLEObjectBuilder.createSportInfo(on.toHashMap())
            }
            return null
        }
        RNBleSendType.WristingTime -> {
            val on = value?.asMap()
            if (on != null) {
                return DSBLEObjectBuilder.createWristingTime(on.toHashMap())
            }
            return null
        }
        RNBleSendType.BloodPressure -> {
            val on = value?.asMap()
            if (on != null) {
                return DSBLEObjectBuilder.createBloodPressureSet(on.toHashMap())
            }
            return null
        }
        RNBleSendType.Climate -> {
            val on = value?.asMap()
            if (on != null) {
                return DSBLEObjectBuilder.createNewWeather(on.toHashMap())
            }
            return null
        }
        RNBleSendType.Time -> {
            val on = value?.asInt()
            if (on != null) {
                return Date(on.toLong())
            }
            return null
        }

        RNBleSendType.Dfu -> {
            val on = value?.asMap()
            if (on != null) {
                return DSBLEObjectBuilder.createDFUSet(on.toHashMap())
            }
            return null
        }
        else -> return value
    }
}




