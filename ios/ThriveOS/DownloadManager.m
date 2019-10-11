//
//  DownloadManager.m
//  ThriveOS
//
//  Created by FMTMacMini on 08/10/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "DownloadManager.h"
#import "Reachability.h"
#import <UIKit/UIKit.h>
#import "AppDelegate.h"

@implementation DownloadManager

RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  NSLog(@"addEvent %@ %@",name,location);
  [self downloadFileFromURL: name];
  
//  http://d1zv7a8bknpl2z.cloudfront.net/1570701229804.zip
//  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}
- (NSArray<NSString *> *)supportedEvents {
  return @[@"sayHello"];
}

- (void)tellJS {
   [self sendEventWithName:@"sayHello" body:@"Hello"];
}

- (BOOL)connected
{
  Reachability *reachability = [Reachability reachabilityForInternetConnection];
  NetworkStatus networkStatus = [reachability currentReachabilityStatus];
  return networkStatus != NotReachable;
}
          
-(void) downloadFileFromURL: (NSString *)url {
    //download the file in a seperate thread.
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        NSLog(@"Downloading Started");
        NSString *urlToDownload = url;
        NSURL  *url = [NSURL URLWithString:urlToDownload];
        NSData *urlData = [NSData dataWithContentsOfURL:url];
        if ( urlData )
        {
            NSArray  *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
            NSString  *documentsDirectory = [paths objectAtIndex:0];
            NSString *filePath = [documentsDirectory stringByAppendingPathComponent:url.lastPathComponent];
            dispatch_async(dispatch_get_main_queue(), ^{
                [urlData writeToFile:filePath atomically:YES];
                NSLog(@"File Saved ! %@",filePath);
              [self sendEventWithName:@"sayHello" body:@"Hello"];
              AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
//              [delegate applicationDidFinishLaunching:nil];
//              [delegate applicationDidFinishLaunching:[UIApplication sharedApplication]];
            });
        }
    });
  
  
}

@end
