import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { User } from '@ionic/cloud-angular';
import { HomePage } from '../home/home'
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html'
})
export class EditProfilePage {
  email: string;
  password: string;
  name: string;
  birthdate: Date;
  sex: string;
  loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public user: User, public loadingCtrl: LoadingController) {
    this.email = this.user.details.email || '';
    this.password = this.user.details.password || '';
    this.name = this.user.get('name', '');
    this.birthdate = this.user.get('birthdate', '');
    this.sex = this.user.get('sex', '');
  }

  ionViewDidLoad() {
    console.log('Hello EditProfile Page');

  }


  saveChanges() {
    this.showLoader();
    this.user.set('name', this.name);
    this.user.set('sex', this.sex);
    this.user.set('birthdate', this.birthdate);
    this.user.details.email = this.email;
    this.user.details.password = this.password;
    this.user.save();
    this.loading.dismiss();
    this.navCtrl.setRoot(HomePage);
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Guardando...'
    });
    this.loading.present();
  }

}
