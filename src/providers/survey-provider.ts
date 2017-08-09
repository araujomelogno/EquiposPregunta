import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from '@ionic/cloud-angular'; 
import { UserData } from '../providers/user-data';
import { SurveyDataModel } from '../models/SurveyDataModel';
import 'rxjs/add/operator/map';
/*
  Generated class for the SurveyProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SurveyProvider {

  constructor( public user: User, public http: Http) {

  }

  getSurveyNames( userData:UserData) {
    debugger;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return new Promise(resolve => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post('https://equipos-pregunta.herokuapp.com/api/surveyNames', JSON.stringify({ user: userData.getCurrentUser().email }), { headers: headers })
        .map(res => res.json())
        .subscribe((data) => {
          debugger;
          resolve(data);
        });

    });

  }

  submitSurvey(userData:UserData,survey: SurveyDataModel, surveyStarted: Date, surveyEnded: Date, surveyAnswers: { questionLabel: String, answer: String }[]) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');


    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let statistics = {
        user: userData.getCurrentUser().email,
        studyId: survey._id,
        started: surveyStarted,
        ended: surveyEnded
      }
      this.http.post('https://equipos-pregunta.herokuapp.com/api/submitSurvey', JSON.stringify({ info: statistics, answerMap: surveyAnswers }), { headers: headers })
        .subscribe((res) => {
          resolve(res);
          console.log(res);
        }, (err) => {
          reject(err);
          console.log(err);
        });

    });

  }
  getSurvey(surveyId: any) {
    debugger;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise(resolve => {
      let headers = new Headers();

      headers.append('Content-Type', 'application/json');
      this.http.post('https://equipos-pregunta.herokuapp.com/api/survey', JSON.stringify({ surveyId: surveyId }), { headers: headers })
        .map(res => res.json())
        .subscribe((data) => {
          debugger;
          resolve(data);
        });

    });

  }
}
