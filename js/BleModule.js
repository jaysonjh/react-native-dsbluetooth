
import { NativeModules} from 'react-native'

/**
 * Native 入口
 * @type {any}
 */
export const BleModule = NativeModules.RNDsbluetooth;

/**
 * 事件监听
 */
export const BleModuleEvent = {
    scanEvent: "ScanEvent",
    bleEvent: "BleEvent",
    syncEvent: "SyncEvent",
    notifyEvent: "NotifyEvent",
    bindEvent: "BindEvent",
    otaEvent: "OtaEvent",
};