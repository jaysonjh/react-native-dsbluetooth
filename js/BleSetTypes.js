/**
 * 性别类型
 */
export const BleGender = {
    female: 0,
    male: 1,
};

/// 语言类型
///
/// - EN:  English
/// - CHS: Chinese
/// - FR:  French
/// - IT:  Italian
/// - ES:  Spanish
/// - TR:  Turkish
/// - PL:  Polish
/// - JP:  Japanese
/// - HU:  Hungarian
/// - DE:  German
/// - RU:  Russian
export const BleLanguage = {
    EN: 0,
    CHS: 1,
    FR: 2,
    IT: 3,
    ES: 4,
    TR: 5,
    PL: 6,
    JP: 7,
    HU: 8,
    DE: 9,
    RU: 10,
};

/// Unit System
///
/// - MS: Metric system
/// - BS: British system
export const BleUnit = {
    BS: 0,
    MS: 1,
};


export const BleHourSystem = {
    H12: 0,
    H24: 1,
};

/// Wristing time type
/// wearHabit Which hand to wear
/// - off: 0
/// - auto: 1 not all bracelet support this type
/// - left: 2
/// - right: 3
export const BleWristingTimeTypes = {
    off: 0,
    auto: 1,
    left: 2,
    right: 3,
};

/**
 * 运动类型
 * @type {{normal: number, strength: number, run: number, cycling: number, free: number, walk: number, swim: number, sevenMin: number}}
 */
export const BleSportTypes = {
    normal: 0,
    run: 1,
    cycling: 2,
    walk: 3,
    strength: 4,
    free: 5,
    swim: 6,
    sevenMin: 7,
};

/**
 * 运动模式的状态
 * @type {{stop: number, start: number, pause: number}}
 */
export const BleSportState = {
    stop: 0,
    start: 1,
    pause: 2,
};

/**
 * 马达震动强度
 * @type {{high: number, middle: number, low: number}}
 */
export const BleVibration = {
  low: 0,
  middle: 1,
  high: 2,
};

/**
 * 屏幕横竖屏显示
 * @type {{landscapeRight: number, portrait: number, landscapeLeft: number}}
 */
export const BleScreenDisplay = {
    portrait: 0,
    landscapeLeft: 1,
    landscapeRight: 2,
};

/**
 * 心率类型
 * @type {{rest: number, test: number, monitor: number, sport: number}}
 */
export const BleHeartRateTypes = {
    test: 0,
    monitor: 1,
    rest: 2,
    sport: 3,
};

/**
 * 防丢器报警距离类型
 * @type {{far: number, near: number, medium: number}}
 */
export const BleAlertTypes = {
    near: 0,
    medium: 1,
    far: 2,
};


/**
 * 秤类型
 * @type {{fat: number, baby: number, none: number, body: number, kitchen: number}}
 */
export const BleScalesTypes = {
    none: 0,
    fat: 1,
    body: 2,
    baby: 3,
    kitchen: 4,
};

/**
 * 跑鞋步数类型
 * @type {{other: number, run: number, up: number, down: number, cycle: number, walk: number}}
 */
export const BleShoeStepTypes = {
    other: 0,
    walk: 1,
    run: 2,
    down: 3,
    up: 4,
    cycle: 5,
};

/**
 * 温度正负值
 * @type {{negative: number, positive: number}}
 */
export const BleTemperatureTypes = {
    negative: 0,
    positive: 1,
};

/**
 * 天气类型
 * @type {{cloudy: number, rain: number, shower: number, fine: number, snow: number, partlyCloudy: number, thunder: number, darkClouds: number, fog: number}}
 */
export const BleWeatherState = {
    /// 多云
    cloudy: 0,

    /// 雷
    thunder: 1,

    /// 晴天
    fine: 2,

    /// 乌云
    darkClouds: 3,

    /// 雾
    fog: 4,

    /// 雪
    snow: 5,

    /// 雨
    rain: 6,

    /// 少云
    partlyCloudy: 7,

    /// 阵雨
    shower: 8,
};

/**
 * 亮度等级
 * @type {{high: number, low: number, medium: number}}
 */
export const BleBrightLevel = {
    low: 0,
    medium: 1,
    high: 2,
};

/**
 * OTA文件类型
 * @type {{framework: number, agps: number}}
 */
export const BleOtaFileTypes = {
    framework: 0x00,
    agps: 0x04,
};

/**
 * 钓鱼器 Cast类型
 * @type {{FLYFISHING: number, TROLLING: number, SPINNING: number, JIGGING: number, INSHORE: number, CARPMATCH: number, POLE: number}}
 */
export const BleFishCastTypes = {
    SPINNING: 0,
    FLYFISHING: 1,
    TROLLING: 2,
    JIGGING: 3,
    CARPMATCH: 4,
    INSHORE: 5,
    POLE: 6,
};

/**
 * 钓鱼器 事件类型
 * @type {{CAST: number, CATCH: number, MARKER: number}}
 */
export const BleFishEventTypes = {
    CAST: 0,
    CATCH: 1,
    MARKER: 2,
};

/**
 * 消息提醒-横竖屏
 * @type {{portrait: number, landscape: number}}
 */
export const BleTextDisplay = {
    portrait: 0,
    landscape: 1,
};

/**
 * 消息通知类型 iOS
 * @type {{QQ: string, WeChat: string, Email: string, Message: string, Gmail: string, GoogleCalendar: string, FBMessenger: string, Twitter: string, GoogleHangout: string, Snapchat: string, Line: string, Weibo: string, Skype: string, PhoneCall: string, Instagram: string, Hike: string, Facebook: string, WhatsApp: string}}
 */
export const BleAppNotifyTypes = {

    PhoneCall: "kWMAppNotifyPhoneCall",
    Message: "kWMAppNotifyMessage",
    WeChat: "kWMAppNotifyWechat",
    QQ: "kWMAppNotifyQQ",
    Facebook: "kWMAppNotifyFacebook",
    Twitter: "kWMAppNotifyTwitter",
    Email: "kWMAppNotifyEmail",
    WhatsApp: "kWMAppNotifyWhatsApp",
    Instagram: "kWMAppNotifyInstagram",
    Line: "kWMAppNotifyLine",
    Skype: "kWMAppNotifySkype",
    Weibo: "kWMAppNotifyWeibo",

    /// customer for WW
    Hike: "kWMAppNotifyHike",
    FBMessenger: "kWMAppNotifyFBMessenger",
    Gmail: "kWMAppNotifyGmail",
    GoogleHangout: "kWMAppNotifyGoogleHangout",
    Snapchat: "kWMAppNotifySnapchat",
    GoogleCalendar: "kWMAppNotifyGoogleCalendar",
};

/**
 * 消息通知类型 Android
 * @type {{QQ: number, WeChat: number, Email: number, Message: number, Gmail: number, GoogleCalendar: number, FBMessenger: number, Twitter: number, GoogleHangout: number, Snapchat: number, Line: number, Weibo: number, Skype: number, PhoneCall: number, Instagram: number, Hike: number, Facebook: number, WhatsApp: number}}
 */
export const BleAppPushTypes = {
    PhoneCall: 0,
    Message: 1,
    QQ: 2,
    WeChat: 3,
    Facebook: 4,
    Twitter: 5,
    WhatsApp: 6,
    Instagram: 7,
    Email: 8,
    Line: 9,
    Skype: 10,
    Weibo: 17,
    /// customer for WW
    Hike: 11,
    FBMessenger: 12,
    Gmail: 13,
    GoogleHangout: 14,
    Snapchat: 15,
    GoogleCalendar: 16,
    /// customer for WW
};

/**
 * 睡眠块开始结束标志
 * @type {{entry: number, deep: number, start: number, end: number}}
 */
export const BleSleepBlockTypes = {
    start: 0,
    entry: 1,
    deep: 2,
    end: 3,
};

/**
 * 睡眠块状态标志
 * @type {{deep: number, wake: number, light: number, run: number, none: number, walk: number}}
 */
export const BleSleepValueTypes = {
    none  : 0,
    wake  : 1,
    walk  : 2,
    run   : 3,
    light : 11,
    deep  : 12,
};

/**
 * 睡眠状态标志
 * @type {{deep: number, light: number, awake: number}}
 */
export const BleSleepTypes = {
    awake : 0,
    light : 2,
    deep  : 3,
};

/**
 * 同步运动数据的开始结束标志
 * @type {{stop: number, start: number}}
 */
export const BleSyncSportTypes = {
    start: 0,
    stop: 1,
};

/**
 * Pai类型
 * @type {{high: number, low: number, medium: number}}
 */
export const BlePaiTypes = {
    low: 0,
    medium: 1,
    high: 2,
};






