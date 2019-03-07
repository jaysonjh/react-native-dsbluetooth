package com.jh.bluetooth

import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

const val ModuleName = "RNDsbluetooth"

class RNDSBluetoothModule(private val reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext), RNBleManagerDelegate {

    private var bleManager: RNBleManager? = null
    override fun getName(): String {
        return ModuleName
    }

    @ReactMethod
    fun initManager(enableLog: Boolean) {
        if (bleManager == null) {
            bleManager = RNBleManager(enableLog,this.reactContext!!.applicationContext)
        }
        bleManager?.delegate = this
    }

    @ReactMethod
    fun destroy() {
        bleManager?.destroy()
        bleManager = null
    }

    @ReactMethod
    fun sdkVersion(promise: Promise) {
        bleManager?.sdkVersion(promise)
    }

    @ReactMethod
    fun enableBle() {
        bleManager?.enableBle()
    }

    @ReactMethod
    fun disableBle() {
        bleManager?.disableBle()
    }
    @ReactMethod
    fun enableDebug(isDebug: Boolean) {
        bleManager?.enableDebug(isDebug)
    }

    @ReactMethod
    fun startScan(filter: ReadableArray? = null, options: ReadableMap? = null) {
        bleManager?.stopScan()
        if (filter != null) {
            val filterSet = mutableSetOf<String>()
            filter.toArrayList().forEach {
                if (it as? String != null) {
                    filterSet.add(it)
                }
            }
            bleManager?.startScan(if (!filterSet.isEmpty()) filterSet.toSet() else null)
        }else {
            bleManager?.startScan(null)
        }
    }

    @ReactMethod
    fun stopScan() {
        bleManager?.stopScan()
    }

    @ReactMethod
    fun connect(mac: String?,autoConnect:Boolean = false) {
        bleManager?.connect(mac,autoConnect)
    }

    @ReactMethod
    fun disconnect(mac: String?) {
        bleManager?.disconnect(mac)
    }

    @ReactMethod
    fun state(promise: Promise) {
        bleManager?.state(promise)
    }

    @ReactMethod
    fun bandSyncData() {
        bleManager?.bandSyncData()
    }

    @ReactMethod
    fun bandBind() {
        bleManager?.bandBind()
    }

    @ReactMethod
    fun bandSend(command: Int, data: Dynamic?, promise: Promise) {
        bleManager?.bandSend(command,data,promise)
    }

    @ReactMethod
    fun bandDfu(data: ReadableMap, promise: Promise) {
        bleManager?.bandDfu(data,promise)
    }

    /**
     * 发送数据给JS
     */
    override fun dispatchEvent(name: String, value: Any?) {
        val emitter = this.reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
        emitter?.emit(name,value)
    }

}