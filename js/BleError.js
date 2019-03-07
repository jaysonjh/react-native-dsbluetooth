import {number,string} from "prop-types";

export class BleError  {
    errorCode: number;
    attErrorCode: number;
    iosErrorCode: number;
    androidErrorCode: number;
    reason: string;
}

/**
 * Platform independent error code map adjusted to this library's use cases.
 */
export const BleErrorCode = {
    // Implementation specific errors ------------------------------------------------------------------------------------
    /**
     * This error can be thrown when unexpected error occurred and in most cases it is related to implementation bug.
     * Original message is available in {@link #bleerrorreason|reason} property.
     */
    UnknownError: 0,
    /**
     * Current promise failed to finish due to BleManager shutdown. It means that user called
     * {@link #blemanagerdestroy|manager.destroy()} function before all operations completed.
     */
    BluetoothManagerDestroyed: 1,
    /**
     * Promise was explicitly cancelled by a user with {@link #blemanagercanceltransaction|manager.cancelTransaction()}
     * function call.
     */
    OperationCancelled: 2,
    /**
     * Operation timed out and was cancelled.
     */
    OperationTimedOut: 3,
    /**
     * Native module couldn't start operation due to internal state, which doesn't allow to do that.
     */
    OperationStartFailed: 4,
    /**
     * Invalid UUIDs or IDs were passed to API call.
     */
    InvalidIdentifiers: 5,

    // Bluetooth global states -------------------------------------------------------------------------------------------
    /**
     * Bluetooth is not supported for this particular device. It may happen on iOS simulator for example.
     */
    BluetoothUnsupported: 100,
    /**
     * There are no granted permissions which allow to use BLE functionality. On Android it may require
     * android.permission.ACCESS_COARSE_LOCATION permission or android.permission.ACCESS_FINE_LOCATION permission.
     */
    BluetoothUnauthorized: 101,
    /**
     * BLE is powered off on device. All previous operations and their state is invalidated.
     */
    BluetoothPoweredOff: 102,
    /**
     * BLE stack is in unspecified state.
     */
    BluetoothInUnknownState: 103,
    /**
     * BLE stack is resetting.
     */
    BluetoothResetting: 104,
    /**
     * BLE state change failed.
     */
    BluetoothStateChangeFailed: 105,

    // Peripheral errors. ------------------------------------------------------------------------------------------------
    /**
     * Couldn't connect to specified device.
     */
    DeviceConnectionFailed: 200,
    /**
     * Device was disconnected.
     */
    DeviceDisconnected: 201,
    /**
     * Couldn't read RSSI from device.
     */
    DeviceRSSIReadFailed: 202,
    /**
     * Device is already connected. It is not allowed to connect twice to the same device.
     */
    DeviceAlreadyConnected: 203,
    /**
     * Couldn't find device with specified ID.
     */
    DeviceNotFound: 204,
    /**
     * Operation failed because device has to be connected to perform it.
     */
    DeviceNotConnected: 205,
    /**
     * Device could not change MTU value.
     */
    DeviceMTUChangeFailed: 206,

    // Services ----------------------------------------------------------------------------------------------------------
    /**
     * Couldn't discover services for specified device.
     */
    ServicesDiscoveryFailed: 300,
    /**
     * Couldn't discover included services for specified service.
     */
    IncludedServicesDiscoveryFailed: 301,
    /**
     * Service with specified ID or UUID couldn't be found. User may need to call
     * {@link #blemanagerdiscoverallservicesandcharacteristicsfordevice|manager.discoverAllServicesAndCharacteristicsForDevice}
     * to cache them.
     */
    ServiceNotFound: 302,
    /**
     * Services were not discovered. User may need to call
     * {@link #blemanagerdiscoverallservicesandcharacteristicsfordevice|manager.discoverAllServicesAndCharacteristicsForDevice}
     * to cache them.
     */
    ServicesNotDiscovered: 303,

    // Characteristics ---------------------------------------------------------------------------------------------------
    /**
     * Couldn't discover characteristics for specified service.
     */
    CharacteristicsDiscoveryFailed: 400,
    /**
     * Couldn't write to specified characteristic. Make sure that
     * {@link #characteristiciswritablewithresponse|characteristic.isWritableWithResponse}
     * or {@link #characteristiciswritablewithoutresponse|characteristic.isWritableWithoutResponse} is set to true.
     */
    CharacteristicWriteFailed: 401,
    /**
     * Couldn't read from specified characteristic. Make sure that
     * {@link #characteristicisreadable|characteristic.isReadable} is set to true.
     */
    CharacteristicReadFailed: 402,
    /**
     * Couldn't set notification or indication for specified characteristic. Make sure that
     * {@link #characteristicisnotifiable|characteristic.isNotifiable} or
     * {@link #characteristicisindicatable|characteristic.isIndicatable} is set to true.
     */
    CharacteristicNotifyChangeFailed: 403,
    /**
     * Characteristic with specified ID or UUID couldn't be found. User may need to call
     * {@link #blemanagerdiscoverallservicesandcharacteristicsfordevice|manager.discoverAllServicesAndCharacteristicsForDevice}
     * to cache them.
     */
    CharacteristicNotFound: 404,
    /**
     * Characteristic were not discovered for specified service. User may need to call
     * {@link #blemanagerdiscoverallservicesandcharacteristicsfordevice|manager.discoverAllServicesAndCharacteristicsForDevice}
     * to cache them.
     */
    CharacteristicsNotDiscovered: 405,
    /**
     * Invalid Base64 format was passed to characteristic API function call.
     */
    CharacteristicInvalidDataFormat: 406,

    // Characteristics ---------------------------------------------------------------------------------------------------
    /**
     * Couldn't discover descriptor for specified characteristic.
     */
    DescriptorsDiscoveryFailed: 500,
    /**
     * Couldn't write to specified descriptor.
     */
    DescriptorWriteFailed: 501,
    /**
     * Couldn't read from specified descriptor.
     */
    DescriptorReadFailed: 502,
    /**
     * Couldn't find specified descriptor.
     */
    DescriptorNotFound: 503,
    /**
     * Descriptors are not discovered for specified characteristic.
     */
    DescriptorsNotDiscovered: 504,
    /**
     * Invalid Base64 format was passed to descriptor API function call.
     */
    DescriptorInvalidDataFormat: 505,

    // Scanning errors ---------------------------------------------------------------------------------------------------
    /**
     * Cannot start scanning operation.
     */
    ScanStartFailed: 600,
    /**
     * Location services are disabled.
     */
    LocationServicesDisabled: 601
};

/**
 * Error codes for ATT errors.
 * @name BleATTErrorCode
 */
export const BleATTErrorCode = {
    /**
     * The ATT command or request successfully completed.
     */
    Success: 0,
    /**
     * The attribute handle is invalid on this device.
     */
    InvalidHandle: 1,
    /**
     * The attribute’s value cannot be read.
     */
    ReadNotPermitted: 2,
    /**
     * The attribute’s value cannot be written.
     */
    WriteNotPermitted: 3,
    /**
     * The attribute Protocol Data Unit (PDU) or “message” is invalid.
     */
    InvalidPdu: 4,
    /**
     * The attribute requires authentication before its value can be read or written.
     */
    InsufficientAuthentication: 5,
    /**
     * The attribute server does not support the request received by the client.
     */
    RequestNotSupported: 6,
    /**
     * The specified offset value was past the end of the attribute’s value.
     */
    InvalidOffset: 7,
    /**
     * The attribute requires authorization before its value can be read or written.
     */
    InsufficientAuthorization: 8,
    /**
     * The prepare queue is full, because too many prepare write requests have been queued.
     */
    PrepareQueueFull: 9,
    /**
     * The attribute is not found within the specified attribute handle range.
     */
    AttributeNotFound: 10,
    /**
     * The attribute cannot be read or written using the ATT read blob request.
     */
    AttributeNotLong: 11,
    /**
     * The encryption key size used for encrypting this link is insufficient.
     */
    InsufficientEncryptionKeySize: 12,
    /**
     * The length of the attribute’s value is invalid for the intended operation.
     */
    InvalidAttributeValueLength: 13,
    /**
     * The ATT request has encountered an unlikely error and therefore could not be completed.
     */
    UnlikelyError: 14,
    /**
     * The attribute requires encryption before its value can be read or written.
     */
    InsufficientEncryption: 15,
    /**
     * The attribute type is not a supported grouping attribute as defined by a higher-layer specification.
     */
    UnsupportedGroupType: 16,
    /**
     * Resources are insufficient to complete the ATT request.
     */
    InsufficientResources: 17

    // Values 0x012 – 0x7F are reserved for future use.
};

/**
 * iOS specific error codes.
 * @name BleIOSErrorCode
 */
export const BleIOSErrorCode = {
    /**
     * An unknown error occurred.
     */
    Unknown: 0,
    /**
     * The specified parameters are invalid.
     */
    InvalidParameters: 1,
    /**
     * The specified attribute handle is invalid.
     */
    InvalidHandle: 2,
    /**
     * The device is not currently connected.
     */
    NotConnected: 3,
    /**
     * The device has run out of space to complete the intended operation.
     */
    OutOfSpace: 4,
    /**
     * The operation is canceled.
     */
    OperationCancelled: 5,
    /**
     * The connection timed out.
     */
    ConnectionTimeout: 6,
    /**
     * The peripheral disconnected.
     */
    PeripheralDisconnected: 7,
    /**
     * The specified UUID is not permitted.
     */
    UuidNotAllowed: 8,
    /**
     * The peripheral is already advertising.
     */
    AlreadyAdvertising: 9,
    /**
     * The connection failed.
     */
    ConnectionFailed: 10,
    /**
     * The device already has the maximum number of connections.
     */
    ConnectionLimitReached: 11,
    /**
     * Unknown device.
     */
    UnknownDevice: 12
};

/**
 * Android specific error codes.
 * @name BleAndroidErrorCode
 */
export const BleAndroidErrorCode = {
    /**
     * The device has insufficient resources to complete the intended operation.
     */
    NoResources: 0x80,
    /**
     * Internal error occurred which may happen due to implementation error in BLE stack.
     */
    InternalError: 0x81,
    /**
     * BLE stack implementation entered illegal state and operation couldn't complete.
     */
    WrongState: 0x82,
    /**
     * BLE stack didn't allocate sufficient memory buffer for internal caches.
     */
    DbFull: 0x83,
    /**
     * Maximum number of pending operations was exceeded.
     */
    Busy: 0x84,
    /**
     * Generic BLE stack error.
     */
    Error: 0x85,
    /**
     * Command is already queued up in GATT.
     */
    CmdStarted: 0x86,
    /**
     * Illegal parameter was passed to internal BLE stack function.
     */
    IllegalParameter: 0x87,
    /**
     * Operation is pending.
     */
    Pending: 0x88,
    /**
     * Authorization failed before performing read or write operation.
     */
    AuthFail: 0x89,
    /**
     * More cache entries were loaded then expected.
     */
    More: 0x8a,
    /**
     * Invalid configuration
     */
    InvalidCfg: 0x8b,
    /**
     * GATT service already started.
     */
    ServiceStarted: 0x8c,
    /**
     * GATT link is encrypted but prone to man in the middle attacks.
     */
    EncrypedNoMitm: 0x8d,
    /**
     * GATT link is not encrypted.
     */
    NotEncrypted: 0x8e,
    /**
     * ATT command was sent but channel is congested.
     */
    Congested: 0x8f
};