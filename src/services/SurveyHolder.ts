import { Injectable } from '@angular/core';
import { SurveyDataModel } from '../models/SurveyDataModel';


import { NavController, LoadingController, ActionSheetController, ToastController, AlertController } from 'ionic-angular';
import { Question } from '../models/questions/Question';
import { HomePage } from '../pages/home/home';
import { TextBoxQuestionPage } from '../pages/text-box-question/text-box-question';
import { SingleChoiceQuestionPage } from '../pages/single-choice-question/single-choice-question';
import { MultipleChoiceQuestionPage } from '../pages/multiple-choice-question/multiple-choice-question';
import { RangeQuestionPage } from '../pages/range-question/range-question';
import { GridQuestionPage } from '../pages/grid-question/grid-question';
import { TextFieldQuestionPage } from '../pages/text-field-question/text-field-question';
import { Http } from '@angular/http';
import { User } from '@ionic/cloud-angular';
import 'rxjs/add/operator/map';
import { AuthProvider } from '../providers/auth/auth';
import { UserData } from '../providers/user-data';
import { SurveyProvider } from '../providers/survey-provider';
@Injectable()
export class SurveyHolder {
    currentQuestionIndex: number = 0;
    survey: SurveyDataModel;
    currentQuestion: Question;
    surveyAnswers: { questionLabel: String, answer: String }[] = [];

    surveyStarted: Date;
    surveyEnded: Date;

    constructor(public userData:UserData,public surveyProvider: SurveyProvider, public loadingController: LoadingController, public authProvider: AuthProvider, public user: User, public alertCtrl: AlertController, public http: Http, public aSurvey: SurveyDataModel, public nav: NavController, public toastCtrl: ToastController, public actionController: ActionSheetController) {
        this.survey = aSurvey;
        this.currentQuestion = aSurvey.questions[0];
    }


    startSurvey() {
        if (this.surveyStarted == null)
            this.surveyStarted = new Date();
        if (this.survey.questions != null && this.survey.questions.length > 0) {
            this.gotoQuestion();
        } else {
            let toast = this.toastCtrl.create({
                message: 'No fue posible acceder a la encuesta',
                duration: 3000
            });
            toast.present();
        }
    }

    gotoQuestion() {
        debugger;
        this.currentQuestion = this.survey.questions[this.currentQuestionIndex];

        if (this.currentQuestion.questionType == 'textbox') {
            this.nav.setRoot(TextBoxQuestionPage, { surveyHolder: this });
        } else if (this.currentQuestion.questionType == 'textfield') {
            this.nav.setRoot(TextFieldQuestionPage, { surveyHolder: this });
        } else if (this.currentQuestion.questionType == 'multiple-choice') {
            this.nav.setRoot(MultipleChoiceQuestionPage, { surveyHolder: this });
        } else if (this.currentQuestion.questionType == 'single-choice') {
            this.nav.setRoot(SingleChoiceQuestionPage, { surveyHolder: this });
        } else if (this.currentQuestion.questionType == 'range') {
            this.nav.setRoot(RangeQuestionPage, { surveyHolder: this });
        } else if (this.currentQuestion.questionType == 'grid') {
            this.nav.setRoot(GridQuestionPage, { surveyHolder: this });
        }

    }

    next() {
        if (this.survey.questions[this.currentQuestionIndex + 1] != null) {
            this.currentQuestionIndex = this.currentQuestionIndex + 1;
            this.gotoQuestion();
        } else {
            this.endSurvey();
        }

    }

    prev() {
        this.currentQuestionIndex = this.currentQuestionIndex - 1;
        this.gotoQuestion();
    }

    endSurvey() {
        this.surveyEnded = new Date();
        this.surveyAnswers = [];
        for (let question of this.survey.questions) {
            this.surveyAnswers.push({ questionLabel: question.label, answer: question.answer });
        }
        this.submitSurvey();

    }



    submitSurvey() {

        console.log('Terminando encuesta');
        let actionSheet = this.actionController.create({
            title: 'Terminar encuesta',
            subTitle: '¿Desea terminar encuesta?',
            buttons: [
                {
                    text: 'Si',
                    handler: () => {

                        let loading = this.loadingController.create({
                            content: "Subiendo Encuesta"
                        });

                        loading.present();
                        this.surveyProvider.submitSurvey(this.userData,this.survey, this.surveyStarted, this.surveyEnded, this.surveyAnswers).then(

                            (res) => {
                                loading.dismiss();
                                let alert = this.alertCtrl.create({
                                    title: 'Equipos Pregunta',
                                    subTitle: 'Encuesta subida con éxito',
                                    buttons: [{
                                        text: 'OK',
                                        handler: () => {
                                            this.nav.setRoot(HomePage);
                                        }
                                    }]
                                });
                                alert.present();
                                console.log(res);
                            }, (err) => {
                                loading.dismiss();
                                let alert = this.alertCtrl.create({
                                    title: 'Equipos Pregunta',
                                    subTitle: 'Error al subir la encueta',
                                    buttons: [{
                                        text: 'cancel',
                                        role: 'canel'

                                    }]
                                });
                                alert.present();
                                console.log(err);
                            });



                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel'
                }
            ]

        });

        actionSheet.present();

    }




}
