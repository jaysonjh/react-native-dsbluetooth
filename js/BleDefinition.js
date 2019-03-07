// @flow
'use strict'

/**
 * Subscription
 * @interface
 */
export interface Subscription {
    /**
     * Removes subscription
     * @memberof Subscription
     * @ignore
     */
    remove(): void;
}

/**
 * Options which can be passed to when creating BLE Manager
 */
export class BleManagerOptions {
    /**
     * BLE State restoration identifier used to restore state.
     * @memberof BleManagerOptions
     * @instance
     */
    restoreStateIdentifier: String;

    /**
     * Optional function which is used to properly restore state of your BLE Manager. Callback
     * is emitted in the beginning of BleManager creation and optional {@link BleRestoreState}
     * is passed. When value is `null` application is launching for the first time, otherwise
     * it contains saved state which may be used by developer to continue working with
     * connected peripherals.
     * @memberof BleManagerOptions
     * @instance
     */
    restoreStateFunction: (restoredState: BleRestoredState) => void;

    /**
     * BLE Log output in Native
     */
    enableLog: boolean;

    constructor() {
        this.restoreStateIdentifier = null;
        this.restoreStateFunction = null;
        this.enableLog = false;
    }

}

/**
 * Object representing information about restored BLE state after application relaunch.
 */
export class BleRestoredState {
    /**
     * List of connected devices after state restoration.
     * @type {Array<any>}
     * @instance
     * @memberof BleRestoredState
     */
    connectedPeripherals: Array<any>;
}

/**
 * Scan mode for Bluetooth LE scan. Only for Android
 */
export const ScanMode = {
    /**
     * A special Bluetooth LE scan mode. Applications using this scan mode will passively listen for
     * other scan results without starting BLE scans themselves.
     */
    Opportunistic: -1,

    /**
     * Perform Bluetooth LE scan in low power mode. This is the default scan mode as it consumes the
     * least power. [default value]
     */
    LowPower: 0,

    /**
     * Perform Bluetooth LE scan in balanced power mode. Scan results are returned at a rate that
     * provides a good trade-off between scan frequency and power consumption.
     */
    Balanced: 1,

    /**
     * Scan using highest duty cycle. It's recommended to only use this mode when the application is
     * running in the foreground.
     */
    LowLatency: 2
};

/**
 * Scan callback type for Bluetooth LE scan.
 * @name ScanCallbackType
 */
export const ScanCallbackType = {
    /**
     * Trigger a callback for every Bluetooth advertisement found that matches the filter criteria.
     * If no filter is active, all advertisement packets are reported. [default value]
     */
    AllMatches: 1,

    /**
     * A result callback is only triggered for the first advertisement packet received that matches
     * the filter criteria.
     */
    FirstMatch: 2,

    /**
     * Receive a callback when advertisements are no longer received from a device that has been
     * previously reported by a first match callback.
     */
    MatchLost: 4
};

/**
 * Options which can be passed to scanning function
 * @name ScanOptions
 */
export class ScanOptions {
    /**
     * By allowing duplicates scanning records are received more frequently [iOS only]
     * @memberof ScanOptions
     * @instance
     */
    allowDuplicates: boolean;

    /**
     * Scan mode for Bluetooth LE scan [Android only]
     * @memberof ScanOptions
     * @instance
     */
    scanMode: ScanMode;

    /**
     * Scan callback type for Bluetooth LE scan [Android only]
     * @memberof ScanOptions
     * @instance
     */
    callbackType: ScanCallbackType;

    constructor(){
        this.allowDuplicates = false;
        this.scanMode = ScanMode.Balanced;
        this.callbackType = ScanCallbackType.AllMatches;
    }
}

/**
 * Connection specific options to be passed before connection happen. [Not used]
 */
export class ConnectionOptions {
    /**
     * Whether to directly connect to the remote device (false) or to automatically connect as soon as the remote device
     * becomes available (true). [Android only]
     * @memberof ConnectionOptions
     * @instance
     */
    autoConnect: boolean;

    /**
     * Whether MTU size will be negotiated to this value. It is not guaranteed to get it after connection is successful.
     *
     * @memberof ConnectionOptions
     * @instance
     */
    requestMTU: number;


    /**
     * Number of milliseconds after connection is automatically timed out. In case of race condition were connection is
     * established right after timeout event, device will be disconnected immediately. Time out may happen earlier then
     * specified due to OS specific behavior.
     *
     * @memberof ConnectionOptions
     * @instance
     */
    timeout: number;

    constructor() {
        this.autoConnect = false;
        this.requestMTU = 23;
        this.timeout = 30000;
    }
}

/**
 * Bluetooth on/off
 */
export const State = {
    On: true,
    Off: false,
};

/**
 * Native module logging log level. By default it is set to None.
 * @name LogLevel
 */
export const LogLevel = {
    /**
     * Logging in native module is disabled
     */
    None: 'None',
    /**
     * All logs in native module are shown
     */
    Verbose: 'Verbose',
    /**
     * Only debug logs and of higher importance are shown in native module.
     */
    Debug: 'Debug',
    /**
     * Only info logs and of higher importance are shown in native module.
     */
    Info: 'Info',
    /**
     * Only warning logs and of higher importance are shown in native module.
     */
    Warning: 'Warning',
    /**
     * Only error logs and of higher importance are shown in native module.
     */
    Error: 'Error'
};

/**
 * Connection priority of BLE link determining the balance between power consumption and data throughput.
 * @name ConnectionPriority
 */
export const ConnectionPriority = {
    /**
     * Default, recommended option balanced between power consumption and data throughput.
     */
    Balanced: 0,
    /**
     * High priority, low latency connection, which increases transfer speed at the expense of power consumption.
     */
    High: 1,
    /**
     * Low power, reduced data rate connection setup.
     */
    LowPower: 2
};

