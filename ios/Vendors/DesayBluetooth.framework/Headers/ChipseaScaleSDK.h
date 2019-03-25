//
//  ChipseaScaleSDK.h
//  ChipseaScaleSDK
//
//  Created by iChipsea on 2017/08/15.
//  Copyright © 2017年 chipsea. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef enum : NSUInteger {
    CSActivateTypeFaile,        //激活失败 或者 尚未授权并已经超过使用次数
    CSActivateTypeTry,          //试用中
    CSActivateTypeSuccess,      //已经激活成功
} CSActivateType;               //激活状态

@interface ChipseaScaleSDK : NSObject

/**
 *  获得单例
 *  @return 返回单例
 */
+(ChipseaScaleSDK *)getInstance;


/**
 * 设置用户信息 (要进行电阻滤波，如果已经滤波过的，就不能再用了,调用此方法试用次数会加一)
 * @param height 身高(cm)
 * @param weight 体重(kg)
 * @param sex 男-1 女-0
 * @param age 年龄
 * @param resistance 当前电阻（未滤波的）
 * @param curDate 当前体重测量时间
 * @param lastResistance 该用户上一次测量有电阻的体重信息的电阻
 * @param lastDate 该用户上一次测量有电阻的体重信息的时间
 */
-(void)setUserInfo_height:(float)height weight:(float)weight sex:(Byte)sex age:(int)age resistance:(float)resistance curTime:(NSDate *)curDate lastResistance:(float) lastResistance lastTime:(NSDate *)lastDate;

/**
 * 设置用户信息 (此方法不进行电阻滤波,调用此方法试用次数不会加一)
 * @param height 身高
 * @param weight 体重
 * @param sex 男-1 女-0
 * @param age 年龄
 * @param resistance 电阻
 * @param curyear 当前年份
 *
 */
-(void)setUserInfo_height:(float)height weight:(float)weight sex:(Byte)sex age:(int)age resistance:(float)resistance curyear:(int)curyear;

/**
 * 接口是否授权 （状态）
 */
-(CSActivateType)hasAuthorized;

/**
 获取还可以调用的次数
 */
-(int)getAuthorizedUsedCount;
/**
 app激活授权
 
 @param macArress mac地址
 */
-(void)activateAppByMacAddress:(NSString *)macArress compBlock:(void(^)(BOOL isSuccess,NSString * msg))compBlock;

/**
 * 获取细胞外液
 */
-(float)getEXF;

/**
 * 获取细胞内液
 */
-(float)getInF;

/**
 * 获取总水重
 */
-(float)getTF;

/**
 * 获取含水百分比
 */
-(float)getTFR;

/**
 * 获取去脂体重(瘦体重)
 */
-(float)getLBM;

/**
 * 获取肌肉重(含水)
 */
-(float)getSLM;

/**
 * 获取肌肉率
 *
 */
-(float)getSLMPrecent;

/**
 * 获取骨骼肌 （kg）
 **/
-(float)getSMM;

/**
 * 获取蛋白质
 */
-(float)getPM;

/**
 * 获取脂肪重
 */
-(float)getFM;

/**
 * 获取脂肪百份比
 */
-(float)getBFR;

/**
 * 获取水肿测试
 */
-(float)getEE;

/**
 * 获取肥胖度
 */
-(float)getOD;

/**
 * 获取肌肉控制
 */
-(float)getMC;

/**
 * 获取体重控制
 */
-(float)getWC;

/**
 * 获取脂肪控制
 */
-(float)getFC;

/**
 * 获取基础代谢
 */
-(float)getBMR;

/**
 * 获取骨(无机盐)
 */
-(float)getMSW;

/**
 * 获取内脏脂肪等级
 */
-(float)getVFR;

/**
 * 获取身体年龄
 */
-(float)getBodyAge;

/**
 * 获取标准体重
 */
-(float)getBW;

/**
 * 获取个体成分评分
 *
 */
-(float)getTotalScore;

-(void)print;



/**
 反查电阻
 
 @param height 身高
 @param gender 性别
 @param weight 体重
 @param age 年龄
 @param bfr 脂肪百份比
 @return 电阻
 */
+(float)getResistanceByHeight:(float)height gender:(Byte)gender weight:(float)weight age:(int) age bfr:(float)bfr;
@end
