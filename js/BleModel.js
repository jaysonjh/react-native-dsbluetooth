import {array, arrayOf, bool, number, string} from "prop-types";
import {
    BleAppPushTypes,
    BleGender,
    BleHeartRateTypes, BleOtaFileTypes, BlePaiTypes, BleShoeStepTypes,
    BleSleepBlockTypes,
    BleSleepTypes,
    BleSleepValueTypes, BleSportState, BleSportTypes, BleSyncSportTypes,
    BleTemperatureTypes, BleVibration,
    BleWeatherState, BleWristingTimeTypes
} from "./BleSetTypes";

/**
 * 蓝牙设备版本号-数据结构
 * @type {{data: Requireable<string>, vendor: Requireable<string>, display: Requireable<string>, version: Requireable<string>}}
 */
export class BleVersion {
    version: string;
    display: string;
    vendor: string;
    data: string;
}

/**
 * 闹钟设置-数据结构
 * @type {{sunday: Requireable<boolean>, saturday: Requireable<boolean>, tuesday: Requireable<boolean>, index: Requireable<number>, wednesday: Requireable<boolean>, thursday: Requireable<boolean>, friday: Requireable<boolean>, time: Requireable<string>, monday: Requireable<boolean>, switch: Requireable<boolean>}}
 */
export class BleAlarm {
    index: number;
    time: string;
    sunday: bool;
    monday: bool;
    tuesday: bool;
    wednesday: bool;
    thursday: bool;
    friday: bool;
    saturday: bool;
    switch: bool;
}

/**
 * 防丢器距离设置-数据结构
 * @type {{nearRange: Requireable<number>, farRange: Requireable<number>}}
 */
export class BleAlertDistance {
    farRange: number;
    nearRange: number;
}

/**
 * Gsensor-数据结构
 * @type {{x: Requireable<number>, y: Requireable<number>, z: Requireable<number>}}
 */
export class BleGsensor {
    x: number;
    y: number;
    z: number;
}

/**
 * 休息模式-数据结构
 * @type {{startTime: DateConstructor, endTime: DateConstructor, swtich: BooleanConstructor}}
 */
export class BleRestMode {
    switch: Boolean;
    startTime: Date;
    endTime: Date;
}

/**
 * 天气-数据结构
 * @type {{temperature: Requireable<number>, weatherState: {cloudy: number, rain: number, shower: number, fine: number, snow: number, partlyCloudy: number, thunder: number, darkClouds: number, fog: number}, type: {negative: number, positive: number}}}
 */
export class BleClimate {
    temperature: number;
    type: BleTemperatureTypes;
    weatherState: BleWeatherState;
}

/**
 * 睡眠原始数据-数据结构
 * @type {{time: DateConstructor, type: {entry: number, deep: number, start: number, end: number}, value: {deep: number, wake: number, light: number, run: number, none: number, walk: number}}}
 */
export class BleSleepBlock  {
    type: BleSleepBlockTypes;
    value: BleSleepValueTypes;
    time: Date;
}

/**
 * 睡眠状态-数据结构
 * @type {{startTime: DateConstructor, state: {deep: number, light: number, awake: number}, endTime: DateConstructor}}
 */
export class BleSleepState {
    state: BleSleepTypes;
    startTime: Date;
    endTime: Date;
}

/**
 * 睡眠结果-数据结构
 * @type {{sleepStates: Requireable<any[]>, awakeDuration: Requireable<number>, beginTime: DateConstructor, endTime: DateConstructor, deepSleepDuration: Requireable<number>, lightSleepDuration: Requireable<number>}}
 */
export class BleSleepInfo {
    awakeDuration: number;
    deepSleepDuration: number;
    lightSleepDuration: number;
    beginTime: Date;
    endTime: Date;
    sleepStates: Array<BleSleepState>;
}

/**
 * 计步数据-数据结构
 * @type {{step: Requireable<number>, startTime: DateConstructor, time: DateConstructor, type: {normal: number, strength: number, run: number, cycling: number, free: number, walk: number, swim: number, sevenMin: number}}}
 */
export class BleStepInfo {
    step: number;
    type: BleSportTypes;
    time: Date;
    // 此时间为推送时间，DB查询时不可取此时间为查询条件。
    startTime: Date;
}

/**
 * 心率血氧-数据结构
 * @type {{hr: Requireable<number>, time: DateConstructor, type: {rest: number, test: number, monitor: number, sport: number}, bo: Requireable<number>}}
 */
export class BleHeartRate {
    time: Date;
    hr: number;
    bo: number;
    type: BleHeartRateTypes
}

/**
 * 血压-数据结构
 * @type {{systole: Requireable<number>, time: DateConstructor, diastole: Requireable<number>}}
 */
export class BleBloodPressure {
    time: Date;
    diastole: number;
    systole: number;
}

/**
 * 专项运动-数据结构
 * @type {{sType: {stop: number, start: number}, step: Requireable<number>, time: DateConstructor, type: {normal: number, strength: number, run: number, cycling: number, free: number, walk: number, swim: number, sevenMin: number}}}
 */
export class BleSport {
    step: number;
    sType: BleSyncSportTypes;
    time: Date;
    type: BleSportTypes;
}


/**
 * 专项运动-数据结构 for 协议2.0
 * @type {{data: Requireable<number>, startTime: DateConstructor, endTime: DateConstructor, type: {normal: number, strength: number, run: number, cycling: number, free: number, walk: number, swim: number, sevenMin: number}, cal: Requireable<number>}}
 */
export class BleSport2 {
    //运动数据
    data: number;
    //运动卡路里
    cal: number;
    startTime: Date;
    endTime: Date;
    type: BleSportTypes;
}

/**
 * 专项运动运动数据同步，App->Device, 数据结构
 * @type {{distance: Requireable<number>, calorie: Requireable<number>, time: Requireable<number>}}
 */
export class BleSportInfo {
    time: number;
    distance: number;
    calorie: number;
}

/**
 * 控制专项运动-数据结构
 * @type {{state: {stop: number, start: number, pause: number}, time: Requireable<number>, type: {normal: number, strength: number, run: number, cycling: number, free: number, walk: number, swim: number, sevenMin: number}}}
 */
export class BleSportSet  {
    state: BleSportState;
    time: number;
    type: BleSportTypes;
}

/**
 * OTA文件-数据结构
 * @type {{filePath: Requireable<string>, deviceMac: Requireable<string>, deviceName: Requireable<string>, fileType: {framework: number, agps: number}}}
 */
export class BleDfuSet {
    deviceMac: string;
    deviceName: string;
    filePath: string;
    fileType: BleOtaFileTypes;
}

/**
 * 久坐提醒-数据结构
 * @type {{startTime: DateConstructor, sedentaryTime: Requireable<number>, endTime: DateConstructor, swtich: Requireable<boolean>}}
 */
export class BleSedentary {
    switch: bool;
    sedentaryTime: number;
    startTime: Date;
    endTime: Date;
}

/**
 * iOS消息推送设置-数据结构
 * @type {{notify: {BleAppNotifyTypes: Requireable<boolean>}}}
 */
export class BleAppNotify {
    notify: { BleAppNotifyTypes : bool};
}


/**
 * Android消息推送设置-数据结构
 */
export class BleAppPush {
    isChinese: bool;
    msg: ?string;
    time: number;
    type: BleAppPushTypes;
}

/**
 * 抬手显示设置-数据结构
 * @type {{startTime: DateConstructor, wristingType: {auto, left, right, off}, endTime: DateConstructor}}
 */
export class BleWristingTime {
    startTime: Date;
    endTime: Date;
    wristingType: BleWristingTimeTypes;
}

/**
 * 血压设置-数据结构
 * @type {{systole: Requireable<number>, diastole: Requireable<number>, on: Requireable<boolean>}}
 */
export class BleBloodPressureSet {
    diastole: number;
    systole: number;
    on: bool;
}

/**
 * 震动类型-数据结构
 * @type {{type: {high: number, middle: number, low: number}, on: Requireable<boolean>}}
 */
export class BleVibrationSet  {
    on: bool;
    type: BleVibration;
}

/**
 * 用户信息-数据结构
 * @type {{gender: {female, male}, weight: Requireable<number>, age: Requireable<number>, height: Requireable<number>}}
 */
export class BleUserInfo {
    age: number;
    gender: BleGender;
    height: number;
    weight: number;
}

/**
 * AQI-数据结构
 * @type {{aqi: Requireable<number>, temperature: Requireable<number>, type: {negative: number, positive: number}}}
 */
export class BleWeather {
    aqi: number;
    temperature: number;
    type: BleTemperatureTypes;
}


/**
 * 心率监测-数据结构
 * @type {{interval: Requireable<number>, swtich: Requireable<boolean>}}
 */
export class BleHRMonitor {
    interval: number;
    switch: bool;
}

/**
 * GPS-数据结构
 * @type {{x: Requireable<number>, y: Requireable<number>, z: Requireable<number>}}
 */
export class BleGps  {
    x: number;
    y: number;
    z: number;
}

/**
 * PAI-数据类型
 * @type {{interval: Requireable<number>, time: DateConstructor, type: {high: number, low: number, medium: number}, value: Requireable<number>}}
 */
export class BlePAIInfo  {
    interval: number;
    time: Date;
    type: BlePaiTypes;
    value: number;
}

/**
 * 跑鞋步数-数据结构
 * @type {{duration: Requireable<number>, step: Requireable<number>, time: DateConstructor, type: {other: number, run: number, up: number, down: number, cycle: number, walk: number}}}
 */
export class BleShoeStepInfo  {
    duration: number;
    step: number;
    type: BleShoeStepTypes;
    time: Date;
}

/**
 * 同步返回的历史数据-数据结构
 * @type {{bloodPressuress: Requireable<any[]>, shoeSteps: Requireable<any[]>, sleeps: Requireable<any[]>, sports: Requireable<any[]>, heartrates: Requireable<any[]>, gps: Requireable<any[]>, steps: Requireable<any[]>, sports2: Requireable<any[]>, pais: Requireable<any[]>}}
 */
export class BleSyncData {
    steps: Array<BleStepInfo>;
    heartrates: Array<BleHeartRate>;
    sleeps: Array<BleSleepBlock>;
    sports: Array<BleSport>;
    sports2: Array<BleSport2>;
    bloodPressuress: Array<BleBloodPressure>;
    pais: Array<BlePAIInfo>;
    gps: Array<BleGps>;
    shoeSteps: Array<BleShoeStepInfo>;
}

