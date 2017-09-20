import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthService } from "../../app/auth.service";
import { AngularFireDatabase } from "angularfire2/database";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authService: AuthService,
    public toastCtrl: ToastController,
    private af: AngularFireDatabase
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  save(email: string, password: string, passwordConfirm: string){

    if (!email || email == ''){
      this.toastCtrl.create({
        message: "Email is not valid",
        duration: 3000
      }).present();
    }
    if (password === passwordConfirm){
      this.authService.signup(email, password, (resp:Boolean, val) => {
        if (resp){
          this.toastCtrl.create({
            message: "Registration successful",
            duration: 3000
          }).present();

          const users = this.af.database.ref('/users');
          users.once('value').then( (list) => {
            list = list.val();
            console.log(list);
            if (!list) list = [];
            
            list.push({
              uid: val.uid,
              email: val.email
            });
            users.set(list);
          })
        }else{
          this.toastCtrl.create({
            message: "Registration failed: "+val.message,
            duration: 5000
          }).present();
        }
      });
    }else{
      this.toastCtrl.create({
        message: "Password doesn't match",
        duration: 3000
      }).present();
    }
  }

}
