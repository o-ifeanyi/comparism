import { Page } from '@nativescript/core';

export function enableLargeTitle(page: Page) {
  page.on('loaded', () => {
    if (__IOS__) {
      (page.frame.ios.controller as UINavigationController).navigationBar.prefersLargeTitles = true;
    }
  });
}
