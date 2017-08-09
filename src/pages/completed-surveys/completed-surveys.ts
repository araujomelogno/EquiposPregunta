import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the CompletedSurveys page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-completed-surveys',
  templateUrl: 'completed-surveys.html'
})
export class CompletedSurveysPage {
  completedSurveys: { name: string, uploaded: string }[] = [];
  constructor(public navCtrl: NavController) {
      this.completedSurveys.push({name:"Estudio 1 ",uploaded:"08/11/2016"});
      this.completedSurveys.push({name:"Estudio 5 ",uploaded:"04/11/2016"});
      this.completedSurveys.push({name:"Estudio 12 ",uploaded:"01/11/2016"});
   }

  ionViewDidLoad() {
    console.log('Hello CompletedSurveys Page');
  }

}
