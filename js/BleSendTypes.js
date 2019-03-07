/**
 * 发送消息指令类型
 */
import {any, bool, number, object, string} from "prop-types";
import {
    BleAlarm,
    BleAlertDistance, BleAppNotify, BleAppPush,
    BleBloodPressureSet, BleClimate, BleHRMonitor,
    BleRestMode,
    BleSedentary, BleSportInfo, BleSportSet,
    BleUserInfo, BleVersion, BleVibrationSet,
    BleWeather, BleWristingTime
} from "./BleModel";
import {Platform} from "react-native";

export const BleSendTypes = {
    /// 通用指令
    common: 1,

    /// 闹钟
    alarm: 2,

    /// 目标
    target: 3,

    /// iOS ANCS
    notification: 4,

    /// 版本号
    version: 5,

    /// 重启
    reboot: 6,

    /// 绑定
    bind: 7,

    /// 个人信息
    userInfo: 8,

    /// 电量
    battery: 9,

    /// 自动步数上报
    autoStep: 10,

    /// 语言
    language: 11,

    /// 抬手显示
    wristingTime: 12,

    /// 久坐提醒
    sedentary: 13,

    /// 找手环
    findBand: 14,

    /// 激活
    active: 15,

    /// 时间
    time: 16,

    /// 时区
    timezone: 17,

    /// OTA
    dfu: 18,

    /// 测试心率
    testHR: 19,

    /// 同步
    sync: 20,

    /// 摄像头
    camera: 21,

    /// 找手机
    findPhone: 22,

    /// 音乐控制
    musicControl: 23,

    /// 单位
    unit: 24,

    /// 智能防丢
    antiLost: 25,

    /// 心率监测
    hrMonitor: 26,

    /// 音乐状态
    musicStatu: 27,

    /// 24小时
    hourSystem: 28,

    /// 专项运动
    sportMode: 29,

    /// 设置步数
    setPace: 30,

    /// 防睡眠
    noSleep: 31,

    /// 设置静态心率
    setRHR: 32,

    /// 设置动态心率
    setDHR: 33,

    /// 获取Gsensor
    gsensor: 34,

    /// 血压设置
    bloodPressure: 35,

    /// ANCS
    ancs: 36,

    /// 运动信息
    sportInfo: 37,

    /// 震动
    motor: 38,

    /// 恢复出厂设置
    reset: 39,

    /// 横竖屏显示
    display: 40,

    /// 性别
    gender: 41,

    /// 清空数据
    clearData: 42,

    /// SN号
    sn: 43,

    /// 测试血压
    testBP: 44,

    /// 连接开关设置
    connect: 45,

    /// 体制秤单位切换
    wUnit: 46,

    /// 孕妇模式
    pregnant: 47,

    /// 防丢器状态
    antiStatus: 48,

    /// 距离提醒
    alertDistance: 49,

    /// 距离提醒类型
    alertType: 50,

    /// 休息模式
    restMode: 51,

    /// 天气(AQI)
    weather: 52,

    /// 卡路里提醒
    calorie: 53,

    /// 距离提醒
    distance: 54,

    /// 喝水提醒
    drink: 55,

    /// 表盘
    dial: 56,

    /// 年龄
    age: 57,

    /// 亮度设置
    bright: 58,

    /// 步数目标
    stepGoal: 59,

    /// 钓鱼 CAST
    cast: 60,

    /// 开始钓鱼
    fish: 61,

    /// 天气
    climate: 62,

    /// 钓鱼同步区间
    syncPeriod: 63,

    /// 清空数据
    clear: 64,

    /// 信息显示
    textDisplay: 65,

    /// mac地址
    mac: 66,
};

/**
 * 发送数据检查
 * @param type
 * @param data
 */
export function sendTypeChecker(type: BleSendTypes, data: any): bool {
    switch (type) {

        case BleSendTypes.sync:
        case BleSendTypes.calorie:
        case BleSendTypes.drink:
        case BleSendTypes.distance:
            return false;

        case BleSendTypes.active:
        case BleSendTypes.battery:
        case BleSendTypes.bind:
        case BleSendTypes.dfu:
        case BleSendTypes.findBand:
        case BleSendTypes.reset:
        case BleSendTypes.reboot:
        case BleSendTypes.version:
        case BleSendTypes.gsensor:
        case BleSendTypes.sn:
        case BleSendTypes.stepGoal:
        case BleSendTypes.clearData:
        case BleSendTypes.clear:
        case BleSendTypes.mac:
            return true;

        case BleSendTypes.time:
        case BleSendTypes.timezone:
            return data == null || typeof(data) === 'undefined' || typeof(data) === 'number';

        case BleSendTypes.antiLost:
        case BleSendTypes.antiStatus:
        case BleSendTypes.autoStep:
        case BleSendTypes.camera:
        case BleSendTypes.findPhone:
        case BleSendTypes.musicControl:
        case BleSendTypes.musicStatu:
        case BleSendTypes.testHR:
        case BleSendTypes.testBP:
        case BleSendTypes.connect:
            return typeof(data) === 'boolean';

        case BleSendTypes.age:
        case BleSendTypes.alertType:
        case BleSendTypes.setPace:
        case BleSendTypes.target:
        case BleSendTypes.bright:
        case BleSendTypes.dial:
        case BleSendTypes.hourSystem:
        case BleSendTypes.language:
        case BleSendTypes.unit:
        case BleSendTypes.noSleep:
        case BleSendTypes.setDHR:
        case BleSendTypes.setRHR:
        case BleSendTypes.display:
        case BleSendTypes.textDisplay:
        case BleSendTypes.gender:
            return typeof(data) === 'number';

        case BleSendTypes.alarm:
            return typeof(data) === 'object' && (data instanceof BleAlarm);

        case BleSendTypes.alertDistance:
            return typeof(data) === 'object' && (data instanceof BleAlertDistance);

        case BleSendTypes.restMode:
            return typeof(data) === 'object' && (data instanceof BleRestMode);

        case BleSendTypes.sedentary:
            return typeof(data) === 'object' && (data instanceof BleSedentary);

        case BleSendTypes.userInfo:
            return typeof(data) === 'object' && (data instanceof BleUserInfo);

        case BleSendTypes.weather:
            return typeof(data) === 'object' && (data instanceof BleWeather);

        case BleSendTypes.ancs:
            return typeof(data) === 'object' && (data instanceof BleAppNotify);

        case BleSendTypes.notification:
            if (Platform.OS === 'ios')
                return typeof(data) === 'object' && (data instanceof BleAppNotify);
            else
                return typeof(data) === 'object' && (data instanceof BleAppPush);

        case BleSendTypes.hrMonitor:
            return typeof(data) === 'object' && (data instanceof BleHRMonitor);

        case BleSendTypes.motor:
            return typeof(data) === 'object' && (data instanceof BleVibrationSet);

        case BleSendTypes.sportMode:
            return typeof(data) === 'object' && (data instanceof BleSportSet);

        case BleSendTypes.wristingTime:
            return typeof(data) === 'object' && (data instanceof BleWristingTime);

        case BleSendTypes.sportInfo:
            return typeof(data) === 'object' && (data instanceof BleSportInfo);

        case BleSendTypes.bloodPressure:
            return typeof(data) === 'object' && (data instanceof BleBloodPressureSet);

        case BleSendTypes.climate:
            return typeof(data) === 'object' && (data instanceof BleClimate);

        default:
            return false;

    }
}
