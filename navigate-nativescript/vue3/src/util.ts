import { EventData, Page } from '@nativescript/core';

export function enableLargeTitle(args: EventData) {
    if (__IOS__) {
      const page = args.object as Page;
      (page.frame.ios.controller as UINavigationController).navigationBar.prefersLargeTitles = true;
    }
}
