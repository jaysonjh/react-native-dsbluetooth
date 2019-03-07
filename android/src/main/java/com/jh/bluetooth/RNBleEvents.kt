package com.jh.bluetooth

/// 同步类型
enum class RNBleSyncTypes(val type: Int) {
    /**
     * 同步开始
     */
    Start(1),
    /**
     * 同步进度
     */
    Progress(2),
    /**
     * 同步结束
     */
    End(3),
    /**
     * 同步异常
     */
    Error(4),
    /**
     * 同步数据返回
     */
    Data(5)
}

/// OTA类型
enum class RNOtaTypes(val type: Int) {
    /**
     * 开始
     */
    Start(1),
    /**
     * 进度
     */
    Progress(2),
    /**
     * 结束
     */
    End(3),
    /**
     * 异常
     */
    Error(4),
}

/**
 * RN Ble事件类型
 */
enum class RNBleEventTypes(val type: Int) {
    /**
     * 扫描事件类型，对应了BleDevice数据
     * Native->RN
     */
    ScanResultEvent(100),

    /**
     * 连接事件类型，对应了BleDevice数据
     * Native->RN
     */
    ConnectResultEvent(101),

    /**
     * 连接断开事件类型，对应了BleDevice数据
     * Native->RN
     */
    DisconnectResultEvent(102),

    /**
     * 接收事件类型，对应了BleNotifyResult数据类型
     * Native->RN
     */
    NotifyEvent(103),

    /**
     * 同步数据事件类型，对应了BleSyncResult数据类型
     * RN->Native
     */
    SyncEvent(104),

    /**
     * 系统蓝牙状态事件类型，对应了BleStateResult数据类型
     */
    StateEvent(105),

    /**
     * 升级模式
     */
    OtaEvent(106),

    /**
     * 绑定
     */
    BindEvent(107),
}

/**
 * Native->JS 发送事件
 */
class RNBleEvent {
    companion object {
        const val scanEvent = "ScanEvent"
        const val bleEvent = "BleEvent"
        const val syncEvent = "SyncEvent"
        const val bindEvent = "BindEvent"
        const val notifyEvent = "NotifyEvent"
        const val otaEvent = "OtaEvent"
        val events = listOf(scanEvent, bleEvent, syncEvent, bindEvent, notifyEvent, otaEvent)
    }
}



