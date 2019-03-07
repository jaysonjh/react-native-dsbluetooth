
#import "RNDsbluetooth.h"
#import "RNDsbluetooth-Swift.h"

@interface RNDsbluetooth () <RNBleManagerDelegate>
@property(nonatomic) RNBleManager* manager;
@property(nonatomic) BOOL hasListeners;
@end

@implementation RNDsbluetooth

@synthesize methodQueue = _methodQueue;
RCT_EXPORT_MODULE()

#pragma mark - 初始化
- (NSArray<NSString *> *)supportedEvents {
    return RNBleEvent.events;
}

//- (dispatch_queue_t)methodQueue {
//    return dispatch_get_main_queue();
//}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (void)startObserving {
    _hasListeners = YES;
}

- (void)stopObserving {
    _hasListeners = NO;
}

#pragma mark - RN方法

RCT_EXPORT_METHOD(init:(NSString *) restoreStateIdentifier enableLog:(BOOL)enableLog) {
    _manager = [[RNBleManager alloc] initWithRestoreStateIdentifier:restoreStateIdentifier enableLog:enableLog];
    _manager.delegate = self;
}


RCT_EXPORT_METHOD(sdkVersion:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
    [_manager sdkVersion:resolve reject:reject];
}

RCT_EXPORT_METHOD(enableDebug:(BOOL) debug) {
    [_manager enableDebug:debug];
}

RCT_EXPORT_METHOD(startScan:(NSArray<NSString *>*) filter options:(NSDictionary<NSString *, id> *) options) {
    [_manager startScanWithFilter:filter != nil ? [NSSet setWithArray:filter] : nil options:options];
}

RCT_EXPORT_METHOD(stopScan) {
    [_manager stopScan];
}

RCT_EXPORT_METHOD(connect:(NSString *) identifier mac:(NSString *) mac) {
    [_manager connectWithIdentifier:identifier mac:mac];
}

RCT_EXPORT_METHOD(disconnect:(NSString *) identifier) {
    [_manager disconnectWithIdentifier:identifier];
}

RCT_EXPORT_METHOD(state:(RCTPromiseResolveBlock)resolve) {
    [_manager state:resolve];
}

RCT_EXPORT_METHOD(bandSend:(NSInteger)command data:(id) data resole:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    [_manager bandSend:command data:data resole:resolve reject:reject];
}

RCT_EXPORT_METHOD(bandSyncData){
    [_manager bandSyncData];
}

RCT_EXPORT_METHOD(bandBind) {
    [_manager bandBind];
}

RCT_EXPORT_METHOD(bandDfu:(id)data resole:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    [_manager bandDfu:data resole:resolve reject:reject];
}

RCT_EXPORT_METHOD(destroy) {
    [_manager destroy];
    _manager = nil;
}



#pragma mark - RNBleManagerDelegate
/**
 处理事件发送
 @param name 事件名称
 @param value 内容
 */
- (void)dispatchEvent:(NSString *)name value:(id)value {
    if (_hasListeners) {
        [self sendEventWithName:name body:value];
    }
}

@end

