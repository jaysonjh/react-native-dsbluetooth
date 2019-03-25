//
//  DesayBluetooth.h
//  DesayBluetooth
//
//  Created by zjw7sky on 2017/4/27.
//  Copyright © 2017年 Desay. All rights reserved.
//

#ifdef __OBJC__
#import <UIKit/UIKit.h>
#else
#ifndef FOUNDATION_EXPORT
#if defined(__cplusplus)
#define FOUNDATION_EXPORT extern "C"
#else
#define FOUNDATION_EXPORT extern
#endif
#endif
#endif

#import "IntelHex2BinConverter.h"
#import "HTBodyfat_SDK.h"
#import "ChipseaScaleSDK.h"

FOUNDATION_EXPORT double DesayBluetoothVersionNumber;
FOUNDATION_EXPORT const unsigned char DesayBluetoothVersionString[];
