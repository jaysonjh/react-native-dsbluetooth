
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(RNDsbluetooth, RCTEventEmitter)

#pragma mark - RN方法

RCT_EXTERN_METHOD(init:(NSString *) restoreStateIdentifier enableLog:(BOOL)enableLog)

RCT_EXTERN_METHOD(sdkVersion:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(enableDebug:(BOOL) debug)

RCT_EXTERN_METHOD(startScan:(NSArray<NSString *>*) filter options:(NSDictionary<NSString *, id> *) options)

RCT_EXTERN_METHOD(stopScan)

RCT_EXTERN_METHOD(connect:(NSString *) identifier mac:(NSString *) mac)

RCT_EXTERN_METHOD(disconnect:(NSString *) identifier)

RCT_EXTERN_METHOD(state:(RCTPromiseResolveBlock)resolve)

RCT_EXTERN_METHOD(bandSend:(NSInteger)command data:(id) data resole:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(bandSyncData)

RCT_EXTERN_METHOD(bandBind)

RCT_EXTERN_METHOD(bandDfu:(id)data resole:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(destroy)

@end

