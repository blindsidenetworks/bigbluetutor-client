//
//  NativeModuleBridge.m
//  BigBlueTutor
//
//  Created by First User on 2017-08-15.
//  Copyright © 2017 Blindside Networks. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(LoginViewController, NSObject)

RCT_EXTERN_METHOD(login:(NSString *) username password: (NSString *) password)

@end
