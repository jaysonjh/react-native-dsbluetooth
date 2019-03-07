/**
 * 设备信息
 */
import {BleSendTypes, sendTypeChecker} from "./BleSendTypes";
import {BleModule} from "./BleModule";
import {BleError, BleErrorCode} from "./BleError";
import BleManager from "./BleManager";
import type {BleNotifyCallback, BleOtaCallback, BleSyncCallback} from "./BleEvents";
import {BleDfuSet} from "./BleModel";
import {bool} from "prop-types";
import {BleOtaFileTypes} from "./BleSetTypes";

export class BleDeviceData {
    /**
     * Device identifier UUID on iOS.
     * @private
     */
    identifier: ?string;

    /**
     * Device MAC address both Android and iOS.
     */
    mac: ?string;

    /**
     * Device name if present
     * @private
     */
    name: string;

    /**
     * Current Received Signal Strength Indication of device
     * @private
     */
    rssi: number;


    /**
     * dfu Mode of device.
     * @private
     */
    isDfu: boolean;

    /**
     * Is device connectable.
     * @private
     */
    isConnectable: boolean;

    constructor(identifier: ?string = null, mac: ?string = null, name: string, rssi: number, isDfu: boolean = false, isConnectable: boolean = true ) {
        this.identifier = identifier;
        this.mac = mac;
        this.name = name;
        this.rssi = rssi;
        this.isDfu = isDfu;
        this.isConnectable = isConnectable;
    }
}


export interface Device {

    deviceData: BleDeviceData;

    syncListener: ?BleSyncCallback;
    notifyListener: ?BleNotifyCallback;

    send(setTypes: BleSendTypes, data: any): Promise<any>;

    disconnect(): void;

    bind(): void;

    sync(listener: ?BleSyncCallback): void;

    dfu(set: BleDfuSet, listener: ?BleOtaCallback): Promise<bool>;

    setNotifyListener(listener: ?BleNotifyCallback): void;

    setOtaListener(listener: ?BleOtaCallback): void;

    setSyncListener(listener: ?BleSyncCallback): void;
}

export class Band implements Device {

    constructor(deviceData: BleDeviceData) {
        this.deviceData = deviceData;
    }

    send(setTypes: BleSendTypes, data: *): Promise<*> {
        ///
        if (!sendTypeChecker(setTypes, data)) {
            //TODO: 类型检查失败，不发送数据,返回catch事件
            return new Promise((resolve, reject) => {
                reject("" + BleErrorCode.CharacteristicWriteFailed,
                    `指令类型${setTypes}与传入的data: ${data}不匹配`,
                    new BleError(BleErrorCode.CharacteristicWriteFailed, `指令类型${setTypes}与传入的data: ${data}不匹配`));
            });
        }
        return BleModule.bandSend(setTypes, data);
    }

    disconnect(): void {
        return BleManager.shared().disconnect(this.deviceData.identifier, this.deviceData.mac)
    }

    bind(): void {
        return BleModule.bandBind();
    }


    sync(listener: ?BleSyncCallback = null): void {
        if (listener != null) {
            if (this.syncListener != null) {
                this.syncListener = null;
            }
            this.syncListener = listener;
        }
        BleModule.bandSyncData();
    }

    dfu(set: BleDfuSet): Promise<bool> {
        if (set == null) return false;
        const {deviceMac, deviceName, filePath, fileType} = set;
        if (!deviceMac || deviceMac.count === 0) {
            console.error("OTA-设备mac地址不能为空");
            return new Promise((resolve, reject) => {
                reject("" + BleErrorCode.BluetoothUnsupported,
                    `OTA-设备mac地址不能为空`,
                    new BleError(BleErrorCode.BluetoothUnsupported, "OTA-设备mac地址不能为空"));
            });
        }

        if (!deviceName || deviceName.count === 0) {
            console.error("OTA-设备名称不能为空");
            return new Promise((resolve, reject) => {
                reject("" + BleErrorCode.BluetoothUnsupported,
                    "OTA-设备名称不能为空",
                    new BleError(BleErrorCode.BluetoothUnsupported, "OTA-设备名称不能为空"));
            });
        }

        if (!filePath || filePath.count === 0) {
            console.error("OTA-文件地址不能为空");
            return new Promise((resolve, reject) => {
                reject("" + BleErrorCode.BluetoothUnsupported,
                    "OTA-文件地址不能为空",
                    new BleError(BleErrorCode.BluetoothUnsupported, "OTA-文件地址不能为空"));
            });
        }

        // if (fileType === BleOtaFileTypes.framework ) {
        //     console.error("OTA-文件类型不能为空");
        //     return new Promise((resolve, reject) => {
        //         reject("" + BleErrorCode.BluetoothUnsupported,
        //             "OTA-文件类型不能为空",
        //             new BleError(BleErrorCode.BluetoothUnsupported, "OTA-文件类型不能为空"));
        //     });
        // }
        return BleModule.bandDfu(set);
    }

    setNotifyListener(listener: BleNotifyCallback): void {
        if (this.notifyListener != null) {
            this.notifyListener = null;
        }
        this.notifyListener = listener;
    }

    setSyncListener(listener: BleSyncCallback): void {
        if (this.syncListener != null) {
            this.syncListener = null;
        }
        this.syncListener = listener;
    }
}

