import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthService } from "../../app/auth.service";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController
    , public navParams: NavParams,private auth: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  
    login(email:string, password:string) {
      this.auth.login(email, password);
    }

}
