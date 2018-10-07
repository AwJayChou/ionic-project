import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatPage } from './cat';

@NgModule({
  declarations: [
    CatPage,
  ],
  imports: [
    IonicPageModule.forChild(CatPage),
  ],
})
export class CatPageModule {}
