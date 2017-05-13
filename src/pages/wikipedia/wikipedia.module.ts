import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Wikipedia } from './wikipedia';

@NgModule({
  declarations: [
    Wikipedia,
  ],
  imports: [
    IonicPageModule.forChild(Wikipedia),
  ],
  exports: [
    Wikipedia
  ]
})
export class WikipediaModule {}
