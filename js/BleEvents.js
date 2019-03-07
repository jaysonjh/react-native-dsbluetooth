// @flow
'use strict'

import {array, arrayOf, bool, number, string, object} from "prop-types";
import BleNotifyTypes from "./BleNotifyTypes";

/**
 * 同步事件类型
 * @type {{data: number, start: number, progress: number, end: number, error: number}}
 */
export const SyncEventTypes = {
    /**
     * 同步开始
     */
    start: 1,
    /**
     * 同步进度
     */
    progress: 2,
    /**
     * 同步结束
     */
    end: 3,
    /**
     * 同步异常
     */
    error: 4,
    /**
     * 同步数据返回
     */
    data: 5,
};

/**
 * ota流程事件类型
 * @type {{start: number, progress: number, end: number, error: number}}
 */
export const OtaEventTypes = {
    /**
     * 开始
     */
    start: 1,
    /**
     * 进度
     */
    progress: 2,
    /**
     * 结束
     */
    end: 3,
    /**
     * 异常
     */
    error: 4,
};

/**
 * 绑定流程事件类型
 * @type {{fail: number, idel: number, success: number, active: number, bond: number}}
 */
export const BindEventTypes = {
    idel: 0,
    bond: 1,
    active: 2,
    success: 3,
    fail: 4,
};

/**
 *
 * @type {{ConnectEvent: number, ScanEvent: number, DisconnectEvent: number, SendEvent: number}}
 */
export const BleEventTypes = {
    /**
     * 扫描事件类型，对应了BleDevice数据
     * Native->RN
     */
    scanResultEvent: 100,

    /**
     * 连接事件类型，对应了BleDevice数据
     * Native->RN
     */
    connectResultEvent: 101,

    /**
     * 连接断开事件类型，对应了BleDevice数据
     * Native->RN
     */
    disconnectResultEvent: 102,

    /**
     * 接收事件类型，对应了BleNotifyResult数据类型
     * Native->RN
     */
    notifyEvent: 103,

    /**
     * 同步数据事件类型，对应了SyncEventData数据类型
     * RN->Native
     */
    syncEvent: 104,

    /**
     * 系统蓝牙状态事件类型，对应了bool数据类型
     */
    stateEvent: 105,

    /**
     * 升级模式, 对应了OtaEventData
     */
    otaEvent: 106,

    /**
     * 绑定事件，对应了BindEventTypes
     */
    bindEvent: 107,
};

/**
 * 蓝牙事件
 *
 * event = scanResultEvent,connectResultEvent,disconnectResultEvent: data为BleDevice
 * event = notifyEvent: data为NotifyEventData
 * event = syncEvent: data为SyncEventData
 * event = stateEvent: data为bool
 * event = otaEvent: data为OtaEventData
 * event = bindEvent: data为BindEventTypes
 */
export class BleEvent {
    event: number;
    error: object;
    data: object;
}


/**
 * 同步事件中对应的data值
 * @type {{syncEvent: {data: number, start: number, progress: number, end: number, error: number}, data: Requireable<object>}}
 */
export class SyncEventData {
    type: SyncEventTypes;
    data: object;
}

/**
 * 自动上报事件对应的data值
 * @type {{data: Requireable<object>, type: {bloodPressure, other, sportHR, musicControl, bindResult, checkHR, noSleep, sos, calorie, pai, step, camera, oxygen, findPhone}}}
 */
export class NotifyEventData {
    type: BleNotifyTypes;
    data: object;
}

/**
 * OTA事件对应的data值
 * @type {{data: Requireable<object>, type: {start: number, progress: number, end: number, error: number}}}
 */
export class OtaEventData  {
    type: OtaEventTypes;
    data: object;
}

/**
 * 蓝牙事件回调
 */
export type BleEventCallback = (event: BleEvent) => void;

/**
 * 同步数据回调
 */
export type BleSyncCallback = (data: SyncEventData) => void;

/**
 * 上报数据回调
 */
export type BleNotifyCallback = (data: NotifyEventData) => void;

/**
 * OTA数据回调
 */
export type BleOtaCallback = (data: OtaEventData) => void;

/**
 * 绑定回调
 */
export type BleBindCallback = (data: BindEventTypes) => void;