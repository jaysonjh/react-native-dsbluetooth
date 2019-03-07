package com.jh.bluetooth

import android.content.Context
import com.desay.dsbluetooth.data.DSBLEAutoType
import com.desay.dsbluetooth.data.DSBLEBandFuncType
import com.desay.dsbluetooth.data.DSBLEDeviceType
import com.desay.dsbluetooth.data.model.DSBLESyncData
import com.desay.dsbluetooth.device.band.DSBLEBindCallback
import com.desay.dsbluetooth.device.band.DSBLESyncCallback
import com.desay.dsbluetooth.manager.keep.BLEAPIManager
import com.desay.dsbluetooth.manager.keep.DSBLECallback
import com.desay.dsbluetooth.manager.keep.DSBLEDevice
import com.facebook.react.bridge.*
import android.content.Intent
import com.desay.dsbluetooth.device.DSBLEDFUCallback
import com.facebook.react.bridge.ReactContext
import java.io.File


interface RNBleManagerDelegate {
    fun dispatchEvent(name: String, value: Any?)
}

/**
 * 蓝牙底层管理器
 */
class RNBleManager(enableLog: Boolean, private val context: Context) : DSBLECallback {

    private var bleManager: BLEAPIManager
    var delegate: RNBleManagerDelegate? = null
    private var syncHandler: RNBleManager.SyncHandler? = null
    private var bindHandler: RNBleManager.BindHandler? = null
    private var otaHandler: RNBleManager.OtaHandler? = null

    init {
        BLEAPIManager.context = context
        BLEAPIManager.otaClass = getMainActivityClass(context)!!::class.java
        if (enableLog) {
            BLEAPIManager.setLogOnWithCode("^DS*&0IJ#_jiKLPURIFIT$")
//            BLEAPIManager.logOut = { log ->
//                println(log)
//            }
        }
        bleManager = BLEAPIManager.instance
        bindHandler = this.BindHandler()
        syncHandler = this.SyncHandler()
        otaHandler = this.OtaHandler()
        bleManager.callback = this
    }

    private fun getMainActivityClass(context: Context): Class<*>? {
        val packageName = context.packageName
        val launchIntent = context.packageManager.getLaunchIntentForPackage(packageName)
        val className = launchIntent!!.component!!.className
        try {
            return Class.forName(className)
        } catch (e: ClassNotFoundException) {
            e.printStackTrace()
            return null
        }
    }

    // <editor-fold defaultstate="collapsed" desc="Module方法">
    fun destroy() {
        bindHandler = null
        syncHandler = null
        otaHandler = null
    }

    fun sdkVersion(promise: Promise) {
        val version = BLEAPIManager.version()
        if (version.isNotEmpty()) {
            promise.resolve(version)
        } else {
            promise.reject("0", "version is null", null)
        }
    }

    fun enableBle() {
        bleManager.enableBle()
    }

    fun disableBle() {
        bleManager.disableBle()
    }

    fun enableDebug(isDebug: Boolean) {
        BLEAPIManager.debug = isDebug
    }

    fun startScan(filter: Set<String>?) {
        bleManager.scan(null, filter)
    }

    fun stopScan() {
        bleManager.stopScan()
    }

    fun connect(mac: String?, autoConnect: Boolean) {
        bleManager.connectWithMac(mac ?: "", autoConnect)
    }

    fun disconnect(mac: String?) {
        bleManager.disconnectWithMac(mac ?: "")
    }

    fun state(promise: Promise) {
        promise.resolve(bleManager.isOn)
    }

    private fun bandNotify() {
        bleManager.band?.notify = { type, data ->
            this.handleNotify(type, data)
        }
    }

    fun bandSend(command: Int, data: Dynamic?, promise: Promise) {
        val sendType = RNBleSendType.values().firstOrNull { it.type == command }
        sendType?.let {
            val sendCommand = toNativeBandCommandType(it)
            val sendData = toNativeBandSendValue(it, data)
            bleManager.band?.makeFunc(sendCommand, sendData) { result, success ->
                if (success) {
                    val resultData = toJSBandValue(it, result)
                    promise.resolve(resultData)
                } else {
                    promise.reject("${BleErrorCode.UnknownError.code}", "Timeout", null)
                }
            }
        }
    }

    fun bandBind() {
        bleManager.band?.bindCallback = this.bindHandler
        bleManager.band?.makeFunc(DSBLEBandFuncType.bind)
    }

    fun bandSyncData() {
        bleManager.band?.syncCallback = this.syncHandler
        bleManager.band?.makeFunc(DSBLEBandFuncType.sync)
    }

    fun bandDfu(dfuFile: ReadableMap ,promise: Promise) {
        val dfuSet = DSBLEObjectBuilder.createDFUSet(dfuFile.toHashMap())
        bleManager.handleDFU(dfuSet,context)
        bleManager.dfuCallback = this.otaHandler
        promise.resolve(true)
    }
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="消息处理">
    private fun dispatchEvent(event: String, eventType: RNBleEventTypes, value: Any, error: RNBleError?) {
        val eventData = handleEvent(eventType, value, error)
        delegate?.dispatchEvent(event, eventData)
    }

    private fun handleEvent(eventType: RNBleEventTypes, value: Any, error: RNBleError?): WritableMap {
        val writableMap = Arguments.createMap()
        writableMap.putInt("event", eventType.type)
        if (error != null) {
            writableMap.putMap("error", error.asJSObject())
        } else {
            writableMap.putNull("error")
        }
        when {
            value as? WritableMap != null -> writableMap.putMap("data", value)
            value as? Int != null -> writableMap.putInt("data", value)
            value as? Double != null -> writableMap.putDouble("data", value)
            value as? String != null -> writableMap.putString("data", value)
            value as? Boolean != null -> writableMap.putBoolean("data", value)
            value as? WritableArray != null -> writableMap.putArray("data", value)
            else -> writableMap.putNull("data")
        }
        return writableMap
    }

    private fun handleSyncData(eventType: RNBleSyncTypes, value: Any?): WritableMap {
        val writableMap = Arguments.createMap()
        writableMap.putInt("type", eventType.type)
        when (eventType) {
            RNBleSyncTypes.Progress -> writableMap.putDouble("data", (value as? Double ?: 0.0))
            RNBleSyncTypes.Data -> {
                if (value as? DSBLESyncData != null) {
                    writableMap.putMap("data", value.asJSObject())
                } else {
                    writableMap.putNull("data")
                }
            }
            else -> writableMap.putNull("data")
        }
        return writableMap
    }

    private fun handleNotify(notifyType: DSBLEAutoType, data: Any?): WritableMap {
        val writableMap = Arguments.createMap()
        writableMap.putInt("type", notifyType.ordinal)
        when {
            data as? WritableMap != null -> writableMap.putMap("data", data)
            data as? Int != null -> writableMap.putInt("data", data)
            data as? Double != null -> writableMap.putDouble("data", data)
            data as? String != null -> writableMap.putString("data", data)
            data as? Boolean != null -> writableMap.putBoolean("data", data)
            data as? WritableArray != null -> writableMap.putArray("data", data)
            else -> writableMap.putNull("data")
        }
        return writableMap
    }

    private fun handleOta(otaType: RNOtaTypes, data: Any?) : WritableMap {
        val writableMap = Arguments.createMap()
        writableMap.putInt("type", otaType.type)
        when {
            data as? WritableMap != null -> writableMap.putMap("data", data)
            data as? Int != null -> writableMap.putInt("data", data)
            data as? Double != null -> writableMap.putDouble("data", data)
            data as? String != null -> writableMap.putString("data", data)
            data as? Boolean != null -> writableMap.putBoolean("data", data)
            data as? WritableArray != null -> writableMap.putArray("data", data)
            else -> writableMap.putNull("data")
        }
        return writableMap
    }

    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="DSBLECallback接口实现">
    override fun onBLEStateChange(on: Boolean) {
        dispatchEvent(RNBleEvent.bleEvent, RNBleEventTypes.StateEvent, on, null)
    }

    override fun onConnectDFUDevice(device: DSBLEDevice) {
        dispatchEvent(RNBleEvent.bleEvent, RNBleEventTypes.OtaEvent, device.asJSObject(), null)
    }

    override fun onConnectDevice(device: DSBLEDevice) {
        if (device.type == DSBLEDeviceType.band) {
            this.bandNotify()
        }
        dispatchEvent(RNBleEvent.bleEvent, RNBleEventTypes.ConnectResultEvent, device.asJSObject(), null)
    }

    override fun onDisconnectDevice(device: DSBLEDevice) {
        dispatchEvent(RNBleEvent.bleEvent, RNBleEventTypes.DisconnectResultEvent, device.asJSObject(), null)
    }

    override fun onDiscoverDevice(device: DSBLEDevice) {
        dispatchEvent(RNBleEvent.scanEvent, RNBleEventTypes.ScanResultEvent, device.asJSObject(), null)
    }
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="实现DSBLEBindCallback"> 
    inner class BindHandler : DSBLEBindCallback {
        override fun onFailed() {
            dispatchEvent(RNBleEvent.bindEvent, RNBleEventTypes.BindEvent, 3, null)
        }

        override fun onStart() {
            dispatchEvent(RNBleEvent.bindEvent, RNBleEventTypes.BindEvent, 1, null)
        }

        override fun onSuccess() {
            dispatchEvent(RNBleEvent.bindEvent, RNBleEventTypes.BindEvent, 2, null)
        }
    }
    // </editor-fold> 

    // <editor-fold defaultstate="collapsed" desc="实现DSBLESyncCallback">
    inner class SyncHandler : DSBLESyncCallback {
        override fun onSuccess(syncData: DSBLESyncData?) {
            dispatchEvent(RNBleEvent.syncEvent, RNBleEventTypes.SyncEvent, handleSyncData(RNBleSyncTypes.Data, syncData), null)
        }

        override fun onWillStart() {
            dispatchEvent(RNBleEvent.syncEvent, RNBleEventTypes.SyncEvent, handleSyncData(RNBleSyncTypes.Start, null), null)
        }

        override fun onWillEnd() {
            dispatchEvent(RNBleEvent.syncEvent, RNBleEventTypes.SyncEvent, handleSyncData(RNBleSyncTypes.End, null), null)
        }

        override fun onSyncProgress(progress: Double) {
            dispatchEvent(RNBleEvent.syncEvent, RNBleEventTypes.SyncEvent, handleSyncData(RNBleSyncTypes.Progress, null), null)
        }

        override fun onFailed() {
            dispatchEvent(RNBleEvent.syncEvent, RNBleEventTypes.SyncEvent, handleSyncData(RNBleSyncTypes.Error, null), null)
        }
    }
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="实现DSBLEDFUCallback">
    inner class OtaHandler : DSBLEDFUCallback {
        override fun onOTAError(error: String) {
            dispatchEvent(RNBleEvent.otaEvent, RNBleEventTypes.OtaEvent, handleOta(RNOtaTypes.Error,error), null)
            bleManager.dfuCallback = null
        }

        override fun onOTAProgress(progress: Double) {
            dispatchEvent(RNBleEvent.otaEvent, RNBleEventTypes.OtaEvent, handleOta(RNOtaTypes.Progress,progress), null)
        }

        override fun onOTAStart() {
            dispatchEvent(RNBleEvent.otaEvent, RNBleEventTypes.OtaEvent, handleOta(RNOtaTypes.Start,null), null)
        }

        override fun onOTASuccess() {
            dispatchEvent(RNBleEvent.otaEvent, RNBleEventTypes.OtaEvent, handleOta(RNOtaTypes.End,null), null)
            bleManager.dfuCallback = null
        }
    }
    // </editor-fold>

}

