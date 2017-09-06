//
//  BigBlueTutorModule.m
//  BigBlueTutor
//
//  Created by First User on 2017-08-15.
//  Copyright © 2017 Blindside Networks. All rights reserved.
//

#import "React/RCTBridgeModule.h"
#import "UIKit/UIViewController.h"

@interface RCT_EXTERN_MODULE(LoginViewController, UIViewController)

RCT_EXTERN_METHOD(login:(NSString *)username password: (NSString *) password)

@end
