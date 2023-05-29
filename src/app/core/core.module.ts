import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './header/header.module';

export abstract class EnsureImportedOnceModule {
  protected constructor(targetModule: any) {
      if (targetModule) {
          throw new Error(`${targetModule.constructor.name} has already been loaded.`);
      }
  }
}
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderModule,
  ],
  exports: [HeaderModule]
})
export class CoreModule extends EnsureImportedOnceModule {
  public constructor(@SkipSelf() @Optional() parent: CoreModule) {
      super(parent);
  }
}