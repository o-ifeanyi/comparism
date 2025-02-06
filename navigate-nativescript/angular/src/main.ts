import { bootstrapApplication, provideNativeScriptHttpClient, provideNativeScriptRouter, runNativeScriptAngularApp, PageRouterOutlet } from '@nativescript/angular';
import { Component, NO_ERRORS_SCHEMA, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { withInterceptorsFromDi } from '@angular/common/http';
import { Routes } from '@angular/router';
import { NavComponent, DetailComponent } from './nav.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: NavComponent },
  { path: 'detail/:color', component: DetailComponent },
];

@Component({
  selector: 'ns-app',
  template: `<GridLayout>
    <page-router-outlet></page-router-outlet>
  </GridLayout>`,
  imports: [PageRouterOutlet],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppComponent {}

runNativeScriptAngularApp({
  appModuleBootstrap: () => {
    return bootstrapApplication(AppComponent, {
      providers: [provideNativeScriptHttpClient(withInterceptorsFromDi()), provideNativeScriptRouter(routes), provideExperimentalZonelessChangeDetection()],
    });
  },
});
