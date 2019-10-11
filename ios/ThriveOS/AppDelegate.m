/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <Firebase.h>
#import "RNFirebaseNotifications.h"
#import "RNFirebaseMessaging.h"
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "Reachability.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  NSLog(@"launchOptions %@",launchOptions);
    [FIRApp configure];
    [RNFirebaseNotifications configure];
    
    // Setup Notifications
    if ([UNUserNotificationCenter class] != nil) {
      // iOS 10 or later
      // For iOS 10 display notification (sent via APNS)
      [UNUserNotificationCenter currentNotificationCenter].delegate = self;
      UNAuthorizationOptions authOptions = UNAuthorizationOptionAlert |
      UNAuthorizationOptionSound | UNAuthorizationOptionBadge;
      [FIRMessaging messaging].delegate = self;
      [[UNUserNotificationCenter currentNotificationCenter]
       requestAuthorizationWithOptions:authOptions
       completionHandler:^(BOOL granted, NSError * _Nullable error) {
         if (error) {
           NSLog(@"error %@", error);
           
         }
         NSLog(@"granted %s", granted?"yes":"no");
       }];
    } else {
      // iOS 10 notifications aren't available; fall back to iOS 8-9 notifications.
      UIUserNotificationType allNotificationTypes =
      (UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge);
      UIUserNotificationSettings *settings =
      [UIUserNotificationSettings settingsForTypes:allNotificationTypes categories:nil];
      [application registerUserNotificationSettings:settings];
    }
    [application registerForRemoteNotifications];
  
  NSURL *bundleURL = [NSURL URLWithString:@"http://d1zv7a8bknpl2z.cloudfront.net/bundle.js"];
  NSArray  *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString  *documentsDirectory = [paths objectAtIndex:0];
  NSString *filePath = [documentsDirectory stringByAppendingPathComponent:bundleURL.lastPathComponent];
  NSURL *filePathUrl = [NSURL URLWithString:filePath];
  NSLog(@"filePath %@",filePath);
  
  if([NSFileManager.defaultManager fileExistsAtPath:filePath]) {
    bundleURL=filePathUrl;
    NSLog(@"app loaded from documents directory");
  }
  else {
    bundleURL =  [[NSBundle mainBundle] URLForResource:@"bundle" withExtension:@"js"];
     NSLog(@"app loaded from root folder");
  }
//  if (![self connected]) {
//    // Not connected
//    NSLog(@"not connected");
//    if([NSFileManager.defaultManager fileExistsAtPath:filePath]) {
//      bundleURL=filePathUrl;
//    }
//
//  }
//  else {
//    if([NSFileManager.defaultManager fileExistsAtPath:filePath]) {
//      bundleURL=filePathUrl;
//    }
//  }
  RCTBridgeModuleListProvider block = nil;
  RCTBridge *bridge = [[RCTBridge alloc] initWithBundleURL:bundleURL moduleProvider:block launchOptions:nil];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"ThriveOS"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}
- (BOOL)connected
{
  Reachability *reachability = [Reachability reachabilityForInternetConnection];
  NetworkStatus networkStatus = [reachability currentReachabilityStatus];
  return networkStatus != NotReachable;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
    [[RNFirebaseNotifications instance] didReceiveLocalNotification:notification];
  NSLog(@"didReceiveLocalNotification");
  }
  
  - (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo
fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler{
    [[RNFirebaseNotifications instance] didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
    
    NSLog(@"didReceiveRemoteNotification");
  }
  
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {
  [[RNFirebaseMessaging instance] didRegisterUserNotificationSettings:notificationSettings];
  NSLog(@"didRegisterUserNotificationSettings");
}

-(void)FIRMessageSettings {
  [[FIRInstanceID instanceID] instanceIDWithHandler:^(FIRInstanceIDResult * _Nullable result,
                                                      NSError * _Nullable error) {
    if (error != nil) {
      NSLog(@"Error fetching remote instance ID: %@", error);
    } else {
      NSLog(@"Remote instance ID token: %@", result.token);
      NSString* message =
        [NSString stringWithFormat:@"Remote InstanceID token: %@", result.token];
      NSLog(@"message %@",message);
//      self.instanceIDTokenMessage.text = message;
    }
  }];
}

- (void)messaging:(FIRMessaging *)messaging didReceiveRegistrationToken:(NSString *)fcmToken {
    NSLog(@"FCM registration token: %@", fcmToken);
    // Notify about received token.
    NSDictionary *dataDict = [NSDictionary dictionaryWithObject:fcmToken forKey:@"token"];
    [[NSNotificationCenter defaultCenter] postNotificationName:
     @"FCMToken" object:nil userInfo:dataDict];
    // TODO: If necessary send token to application server.
    // Note: This callback is fired at each app startup and whenever a new token is generated.
}

// With "FirebaseAppDelegateProxyEnabled": NO
- (void)application:(UIApplication *)application
    didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    [FIRMessaging messaging].APNSToken = deviceToken;
}

// Receive displayed notifications for iOS 10 devices.
// Handle incoming notification messages while app is in the foreground.
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler {
  NSDictionary *userInfo = notification.request.content.userInfo;

  // With swizzling disabled you must let Messaging know about the message, for Analytics
  // [[FIRMessaging messaging] appDidReceiveMessage:userInfo];

  // Print message ID.
//  if (userInfo[kGCMMessageIDKey]) {
//    NSLog(@"Message ID: %@", userInfo[kGCMMessageIDKey]);
//  }

  // Print full message.
  NSLog(@"userInfo %@", userInfo);

  // Change this to your preferred presentation option
  completionHandler(UNNotificationPresentationOptionNone);
}

// Handle notification messages after display notification is tapped by the user.
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void(^)(void))completionHandler {
  NSDictionary *userInfo = response.notification.request.content.userInfo;
//  if (userInfo[kGCMMessageIDKey]) {
//    NSLog(@"Message ID: %@", userInfo[kGCMMessageIDKey]);
//  }

  // Print full message.
  NSLog(@"userInfo %@", userInfo);

  completionHandler();
}

@end
