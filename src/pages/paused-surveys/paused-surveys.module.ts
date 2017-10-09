import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PausedSurveysPage } from './paused-surveys';

@NgModule({
  declarations: [
    PausedSurveysPage,
  ],
  imports: [
    IonicPageModule.forChild(PausedSurveysPage),
  ],
})
export class PausedSurveysPageModule {}
