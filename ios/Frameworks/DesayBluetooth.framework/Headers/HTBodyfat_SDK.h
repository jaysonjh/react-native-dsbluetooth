//
//  HTBodyfat.h
//
//  Created by Holtek on 17/01/10.
//  Copyright © 2016年 Holtek. All rights reserved.
//
//  Version: 2.04, lib for armV7、arm64、i386、x86_x64
//
#import <UIKit/UIKit.h>


///性别类型
typedef NS_ENUM(NSInteger, HTSexType){
    HTSexTypeFemale,        //!< 女性
    HTSexTypeMale           //!< 男性
};

///错误类型(针对输入的参数)
typedef NS_ENUM(NSInteger, HTBodyfatErrorType){
    HTBodyfatErrorTypeNone,         //!< 无错误(可读取所有参数)
    HTBodyfatErrorTypeImpedance,    //!< 阻抗有误,阻抗有误时, 不计算除BMI/idealWeightKg以外参数(写0)
    HTBodyfatErrorTypeAge,          //!< 年龄参数有误，需在 6   ~ 99岁(不计算除BMI/idealWeightKg以外参数)
    HTBodyfatErrorTypeWeight,       //!< 体重参数有误，需在 10  ~ 200kg(有误不计算所有参数)
    HTBodyfatErrorTypeHeight        //!< 身高参数有误，需在 90 ~ 220cm(不计算所有参数)
};
///身体类型
typedef NS_ENUM(NSInteger, HTBodyType){
    HTBodyTypeThin,             //!< 偏瘦型
    HTBodyTypeLThinMuscle,      //!< 偏瘦肌肉型
    HTBodyTypeMuscular,         //!< 肌肉发达型
    
    HTBodyTypeLackofexercise,   //!< 缺乏运动型
    HTBodyTypeStandard,         //!< 标准型
    HTBodyTypeStandardMuscle,   //!< 标准肌肉型
    
    HTBodyTypeObesFat,          //!< 浮肿肥胖型
    HTBodyTypeLFatMuscle,       //!< 偏胖肌肉型
    HTBodyTypeMuscleFat,        //!< 肌肉型偏胖
    
};
#pragma mark - HTPeopleGeneral
// 计算体脂参数所需数据model
// 所有字典使用说明如下:
// 1.以BMI为例
// 小于"瘦－普通"为瘦,小于“普通－偏胖”为普通，小于"偏胖－肥胖"为偏胖，其它肥胖

// 2.以体脂率为例
// 小于"偏瘦－标准"        为偏瘦
// 小于“标准－警惕”        为标准
// 小于"警惕－偏胖"        为警惕
// 小于"偏胖－肥胖"        为偏胖
// 其它                   肥胖
@interface HTPeopleGeneral : NSObject

@property (nonatomic,assign) HTSexType            htSex;         //!< 性别
@property (nonatomic,assign) NSInteger            htHeightCm;    //!< 身高(cm)，需在 90 ~ 220cm
@property (nonatomic,assign) CGFloat              htWeightKg;    //!< 体重(kg)，需在 10  ~ 200kg
@property (nonatomic,assign) NSInteger            htAge;         //!< 年龄(岁)，需在6 ~ 99岁
@property (nonatomic,assign) CGFloat              htZTwoLegs;    //!< 脚对脚阻抗值(Ω), 范围200.0 ~ 1200.0

@property (nonatomic,assign) CGFloat              htproteinPercentage;    //!< 蛋白质,分辨率0.1, 范围2.0% ~ 30.0%
@property (nonatomic,copy) NSDictionary*          htproteinRatingList;    //!< 蛋白健康标准字典,"不足-标准"“标准-优秀”

@property (nonatomic,assign) NSInteger            htBodyAge;              //!< 身体年龄,6~99岁
@property (nonatomic,assign) CGFloat              htIdealWeightKg;        //!< 理想体重(kg)

@property (nonatomic,assign) CGFloat              htBMI;                  //!< Body Mass Index 人体质量指数, 分辨率0.1, 范围10.0 ~ 90.0
@property (nonatomic,copy) NSDictionary*          htBMIRatingList;        //!< BMI健康标准字典,"瘦-普通"“普通-偏胖”“偏胖-肥胖”

@property (nonatomic,assign) NSInteger            htBMR;                  //!< Basal Metabolic Rate基础代谢, 分辨率1, 范围500 ~ 10000
@property (nonatomic,copy) NSDictionary*          htBMRRatingList;        //!< 基础代谢健康标准字典:"偏低-达标"

@property (nonatomic,assign) NSInteger            htVFAL;                 //!< Visceral fat area leverl内脏脂肪, 分辨率1, 范围1 ~ 60
@property (nonatomic,copy) NSDictionary*          htVFALRatingList;       //!< 内脏脂肪等级标准字典,"标准-警惕""警惕-危险"

@property (nonatomic,assign) CGFloat              htBoneKg;               //!< 骨量(kg), 分辨率0.1, 范围0.5 ~ 8.0
@property (nonatomic,copy) NSDictionary*          htBoneRatingList;       //!< 骨量等级标准字典,"不足-标准"“标准-优秀”


@property (nonatomic,assign) CGFloat              htBodyfatPercentage;    //!< 脂肪率(%), 分辨率0.1, 范围5.0% ~ 75.0%
@property (nonatomic,copy) NSDictionary*          htBodyfatRatingList;    //!< 脂肪率健康标准字典"偏瘦-标准"“标准-警惕”“警惕-偏胖”“偏胖-肥胖”

@property (nonatomic,assign) CGFloat              htWaterPercentage;      //!< 水分率(%), 分辨率0.1, 范围35.0% ~ 75.0%
@property (nonatomic,copy) NSDictionary*          htWaterRatingList;      //!< 水分率健康标准 "不足-标准"“标准-优秀”

@property (nonatomic,assign) CGFloat              htMuscleKg;             //!< 肌肉量(kg), 分辨率0.1, 范围10.0 ~ 120.0
@property (nonatomic,copy) NSDictionary*          htMuscleRatingList;     //!< 肌肉量健康标准 "不足-标准"“标准-优秀”

@property (nonatomic,assign) HTBodyType           htBodyType;              //!< 身体类型
@property (nonatomic,assign) NSInteger            htBodyScore;             //!< 身体得分，50 ~ 100分
@property (nonatomic,assign) CGFloat              htMusclePercentage;      //!< 肌肉率(%),分辨率0.1，范围5%~90%
@property (nonatomic,assign) CGFloat              htBodyfatKg;             //!< 脂肪量(kg)

/**
 *  根据人体数据计算体脂参数
 *
 *  @param weightKg   体重，单位kg
 *  @param heightCm   身高，单位cm
 *  @param sex        性别
 *  @param age        年龄
 *  @param impedance  阻抗系数
 *
 *  @return 人体数据是否有误，计算成功则返回HTBodyfatErrorTypeNone
 */
- (HTBodyfatErrorType )getBodyfatWithweightKg:(CGFloat)weightKg heightCm:(CGFloat)heightCm sex:(HTSexType)sex age:(NSInteger)age impedance:(NSInteger)impedance;

@end

