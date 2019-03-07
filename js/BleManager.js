import {BleModule, BleModuleEvent} from './BleModule'
import {BleManagerOptions, ScanOptions, State, Subscription} from './BleDefinition'
import type {BleBindCallback, BleOtaCallback} from "./BleEvents";
import {BleEvent, BleEventTypes, NotifyEventData, OtaEventData, SyncEventData} from './BleEvents'
import {EmitterSubscription, NativeEventEmitter, Platform} from "react-native";
import {Band, BleDeviceData, Device} from "./BleDevice";

let instance = null;
/**
 * RN端的蓝牙管理类
 */
export default class BleManager {

    //扫描事件监听
    _scanSubscription: ?EmitterSubscription;
    //同步事件监听
    _syncSubscriptions: ?EmitterSubscription;
    //ota事件监听
    _otaSubscriptions: ?EmitterSubscription;
    //上报事件监听
    _notifySubscriptions: ?EmitterSubscription;
    //绑定事件监听
    _bindSubscriptions: ?EmitterSubscription;
    // Map 事件监听 for App（RN）
    _bleSubscriptions: { [id: string]: Subscription };
    // 其它事件监听 for native
    _eventEmitter: NativeEventEmitter;
    // Unique identifier used to create internal transactionIds
    _uniqueId: number;
    // 连接的设备
    band: ?Device;

    /***
     * 类方法
     */
    static shared(options: BleManagerOptions = new BleManagerOptions()) {
        return new BleManager(options);
    }


    constructor(options: BleManagerOptions = new BleManagerOptions()) {

        if (!instance) {
            instance = this;
            /// 建立消息通道
            this._eventEmitter = new NativeEventEmitter(BleModule);
            /// 初始化Manager
            if (Platform.OS === 'ios') {
                BleModule.init(options.restoreStateIdentifier, options.enableLog);
            }else if (Platform.OS === 'android') {
                BleModule.initManager(options.enableLog);
            }
            this._bleSubscriptions = {};
            this._uniqueId = 0;
            this._onNotifyListener();
            this._onSyncListener();
            return instance;
        }
        return instance;
    }


    /**
     * 获取版本号
     */
    getVersion() {
        return BleModule.sdkVersion();
    }

    /**
     * 是否开启Debug模式
     * @param isDebug
     */
    enableDebug(isDebug: boolean) {
        BleModule.enableDebug(isDebug || false);
    }

    /**
     * Generates new unique identifier to be used internally.
     *
     * @returns {string} New identifier.
     * @private
     */
    _nextUniqueID(): string {
        this._uniqueId += 1;
        return this._uniqueId.toString();
    }

    // Mark: Clear Function --------------------------------------------------------------------------------------------
    destory() {
        this._destoryBand();
        this._destorySubscriptions();
        instance = null;
        BleModule.destory();
    }

    _destoryBand() {
        this.band?.disconnect();
        this.band = null;
    }

    _destorySubscriptions() {
        for (const id in this._bleSubscriptions) {
            this._bleSubscriptions[id].remove();
        }
        this.removeBindListener();
        this._removeSyncListener();
        this.removeOtaListener();
        this._removeNotifyListener();
    }


    // Mark: Listener --------------------------------------------------------------------------------------------------

    /**
     * 初始化蓝牙监听
     * @param listener
     */
    onBleListener(listener: (event: BleEvent) => void): Subscription {
        const bleListener = (event: BleEvent) => {
            this._handlerBleEvent(event);
            listener(event);
        };
        const subscription: Subscription = this._eventEmitter.addListener(BleModuleEvent.bleEvent, bleListener);
        const id = this._nextUniqueID();
        const wrappedSubscription = {
            remove: () => {
                if (this._bleSubscriptions[id] != null) {
                    delete this._bleSubscriptions[id];
                    subscription.remove()
                }
            }
        };
        this._bleSubscriptions[id] = wrappedSubscription;
        return wrappedSubscription
    }

    /**
     * 绑定监听器
     * @param listener
     */
    onBindListener(listener: BleBindCallback) {
        const bindListener = (event: BleEvent) => {
            listener(this._handlerBleEvent(event));
        };
        this.removeBindListener();
        this._bindSubscriptions = this._eventEmitter.addListener(BleModuleEvent.bindEvent, bindListener);
    }

    /**
     * ota事件上报
     * @private
     */
    onOtaListener(listener: BleOtaCallback) {
        const otaListener = (event: BleEvent) => {
            listener(this._handlerBleEvent(event));
        };

        this.removeOtaListener();
        this._otaSubscriptions = this._eventEmitter.addListener(BleModuleEvent.otaEvent, otaListener);
    }

    /**
     * 解除绑定监听
     */
    removeBindListener() {
        if(this._bindSubscriptions != null) {
            this._bindSubscriptions.remove();
            this._bindSubscriptions = null;
        }
    }

    /**
     * 同步数据监听器
     */
    _onSyncListener() {
        const syncListener = (event: BleEvent) => {
            this.band?.syncListener(this._handlerBleEvent(event));
        };

        this._removeSyncListener();
        this._syncSubscriptions = this._eventEmitter.addListener(BleModuleEvent.syncEvent, syncListener);
    }

    /**
     * 设备事件上报
     * @private
     */
    _onNotifyListener() {
        const notifyListener = (event: BleEvent) => {
            this.band?.notifyListener(this._handlerBleEvent(event));
        };

        this._removeNotifyListener();
        this._notifySubscriptions = this._eventEmitter.addListener(BleModuleEvent.notifyEvent, notifyListener);
    }


    /**
     * 解除绑定监听
     */
    _removeSyncListener() {
        if(this._syncSubscriptions != null) {
            this._syncSubscriptions.remove();
            this._syncSubscriptions = null;
        }
    }

    removeOtaListener() {
        if(this._otaSubscriptions != null) {
            this._otaSubscriptions.remove();
            this._otaSubscriptions = null;
        }
    }

    _removeNotifyListener() {
        if(this._notifySubscriptions != null) {
            this._notifySubscriptions.remove();
            this._notifySubscriptions = null;
        }
    }


    _handlerBleEvent(bleEvent: BleEvent): any {
        const {event, error, data} = bleEvent;
        if (event != null) {
            switch (event) {
                case BleEventTypes.stateEvent: {
                    if (!error) {
                        if (typeof(data) === "boolean") {
                            if (!data) {
                                this._destoryBand();
                            }
                            return data;
                        }
                        return null;
                    }
                    return null;
                }
                case BleEventTypes.connectResultEvent: {
                    this._destoryBand();
                    const {mac,identifier,name,rssi,isDfu,isConnectable} = data;
                    const deviceData = new BleDeviceData(identifier,mac,name,rssi,isDfu,isConnectable);
                    if (!error) {
                        this.band = new Band(deviceData);
                    }
                    return deviceData;
                }
                case BleEventTypes.disconnectResultEvent: {
                    this._destoryBand();
                    const {mac,identifier,name,rssi,isDfu,isConnectable} = data;
                    return new BleDeviceData(identifier, mac, name, rssi, isDfu, isConnectable);
                }
                case BleEventTypes.otaEvent: {
                    const otaEventData = new OtaEventData();
                    otaEventData.type = data.type;
                    if (data.data) {
                        otaEventData.data = data.data;
                    }
                    return otaEventData;
                }
                case BleEventTypes.notifyEvent: {
                    const notifyData = new NotifyEventData();
                    notifyData.type = data.type;
                    if (data.data) {
                        notifyData.data = data.data;
                    }
                    return notifyData;
                }
                case BleEventTypes.syncEvent: {
                    const syncData = new SyncEventData();
                    syncData.type = data.type;
                    if (data.data) {
                        syncData.data = data.data;
                    }
                    return syncData;
                }
                case BleEventTypes.bindEvent: {
                    return data;
                }
                case BleEventTypes.scanResultEvent: {
                    const {mac,identifier,name,rssi,isDfu,isConnectable} = data;
                    return new BleDeviceData(identifier, mac, name, rssi, isDfu, isConnectable);
                }
                default:
                    // do nothing
                    return null;

            }
        }
    }

    // Mark: Common ----------------------------------------------------------------------------------------------------

    state(): Promise<$Keys<typeof State>> {
        return BleModule.state();
    }

    /**
     * 开启扫描
     * @param filter 过滤设备
     * @param scanOption 扫描参数
     * @param listener 扫描回调函数
     */
    startScan(filter: ?Array<String>, scanOption: ?ScanOptions, listener: (device: BleDeviceData) => void) {
        this.stopScan();
        const scanListener = (result) => {
            console.log("Scan Result =>>>>>>>>>>>>>>>>>>>>>>");
            console.log(result);
            listener(this._handlerBleEvent(result));
        };
        // $FlowFixMe: Flow cannot deduce EmitterSubscription type.
        this._scanEventSubscription = this._eventEmitter.addListener(BleModuleEvent.scanEvent, scanListener);
        BleModule.startScan(filter, scanOption != null ? JSON.stringify(scanOption) : null);
    }

    /**
     * 结束扫描
     */
    stopScan() {
        if (this._scanEventSubscription != null) {
            this._scanEventSubscription.remove();
            this._scanEventSubscription = null;
        }
        BleModule.stopScan();
    }

    /**
     * 连接设备
     * @param identifier 苹果连接设备ID， only for iOS
     * @param mac 设备mac地址，Both for iOS and Android
     * @param autoConnect
     */
    connect(identifier: ?String, mac: ?String, autoConnect: boolean = false) {
        this.stopScan();
        if (Platform.OS === 'ios') {
            BleModule.connect(identifier, mac);
        } else if (Platform.OS === 'android') {
            BleModule.connect(mac, autoConnect);
        }
    }

    disconnect(identifier: ?String, mac: ?String) {
        if (Platform.OS === 'ios') {
            BleModule.disconnect(identifier);
        } else if (Platform.OS === 'android') {
            BleModule.disconnect(mac);
        }
    }

}