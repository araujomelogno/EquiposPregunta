import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Auth, User, IDetailedError } from '@ionic/cloud-angular';

import { HomePage } from '../home/home';
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  email: string;
  password: string;
  loading: any;
  name: string;
  birthdate: Date;
  sex: string;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public auth: Auth, public loadingCtrl: LoadingController, public user: User) {

  }

  register() {

    debugger;
    this.showLoader();
    let details = {
      email: this.email,
      password: this.password
    };
    debugger;
    this.auth.signup(details).then(() => {
      debugger;
      this.auth.login('basic', details).then(() => {
        this.user.set('name', this.name);
        this.user.set('birthdate', this.birthdate);
        this.user.set('sex', this.sex);
        this.user.save();
        this.loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      });
    }, (err: IDetailedError<string[]>) => {
    err.details;
      /*
      for (let e of err.details) {
        if (e === 'conflict_email') {
          let alert = this.alertCtrl.create({
            title: 'Login',
            subTitle: 'Email ya excistente',
            buttons: ['Dismiss']
          });
          this.loading.dismiss();
          alert.present();
        } else {
          if (e === 'required_email' || e === 'required_password') {
            let alert = this.alertCtrl.create({
              title: 'Login',
              subTitle: 'El email y el password son campos requeridos',
              buttons: ['Dismiss']
            });
            this.loading.dismiss();
            alert.present();
          } else {
            let alert = this.alertCtrl.create({
              title: 'Login',
              subTitle: 'Error al loguear usuario',
              buttons: ['Dismiss']
            });
            this.loading.dismiss();
            alert.present();
            console.log(e);
          }
        }
      }
      */
    });

  }

  showLoader() {

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }

}
