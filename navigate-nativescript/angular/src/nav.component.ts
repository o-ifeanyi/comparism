import { Component, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NativeScriptCommonModule, NativeScriptRouterModule, RouterExtensions } from '@nativescript/angular';
import { CollectionViewItemEventData } from '@nativescript-community/ui-collectionview';
import { CollectionViewModule } from '@nativescript-community/ui-collectionview/angular';
import { Page } from '@nativescript/core';
import { take } from 'rxjs';
import { enableLargeTitle } from './util';

@Component({
  template: `<ActionBar title="Colors"> </ActionBar>
    <CollectionView [items]="colors" (itemTap)="nav($event)" colWidth="49.9%" rowHeight="148" class="px-1" iosOverflowSafeArea="true" scrollBarIndicatorVisible="false">
      <ng-template let-color="item">
        <StackLayout class="pt-2">
          <GridLayout class="rounded-2xl h-[140] mx-[4]" [backgroundColor]="color"> </GridLayout>
        </StackLayout>
      </ng-template>
    </CollectionView>`,
  imports: [NativeScriptCommonModule, NativeScriptRouterModule, CollectionViewModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NavComponent {
  page = inject(Page);
  router = inject(RouterExtensions);
  colors = ['red', 'green', 'blue', 'orange', 'purple', 'black'];
  constructor() {
    enableLargeTitle(this.page);
    this.colors = this.colors.concat([...Array(5)].map(() => 'transparent'));
  }
  nav(event: CollectionViewItemEventData) {
    this.router.navigate(['/detail', this.colors[event.index]]);
  }
}

@Component({
  template: `<ActionBar title="Color Detail">
    <NavigationButton text="Colors" android:icon="~/back.png" (tap)="router.back()" />
  </ActionBar>
    <CollectionView [items]="[1, 2, 3, 4]" iosOverflowSafeArea="true" scrollBarIndicatorVisible="false" class="pb-4">
      <ng-template let-item="item">
        <StackLayout>
          <GridLayout class="rounded-2xl h-[300] mx-4 mt-5" [backgroundColor]="color || 'black'"> </GridLayout>
          
        </StackLayout>
      </ng-template>
    </CollectionView>`,
  imports: [NativeScriptCommonModule, CollectionViewModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class DetailComponent {
  page = inject(Page);
  router = inject(RouterExtensions);
  activeRoute = inject(ActivatedRoute);
  color: string;
  constructor() {
    enableLargeTitle(this.page);
    this.activeRoute.params.pipe(take(1)).subscribe(params => (this.color = params['color']));
  }
}
