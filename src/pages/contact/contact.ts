import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from "../../app/auth.service";
import { AngularFireDatabase } from "angularfire2/database";
import { HomePage } from "../home/home";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  user: firebase.User = null;

  constructor(public navCtrl: NavController, authService: AuthService, private af: AngularFireDatabase) {

    authService.user.subscribe( (u) => {
      const d = new Date();
      const today = d.getDate().toString()+(d.getMonth()+1).toString()+d.getFullYear().toString();
      const DATA_PATH = '/'+u.uid+'/items/'+today+'/data/user/';
  
      this.af.database.ref(DATA_PATH).once('value').then( user => {
        this.user = user;
        console.log(user);
      });
    } );
  }

  save(name:string){
    const d = new Date();
    const today = d.getDate().toString()+(d.getMonth()+1).toString()+d.getFullYear().toString();
    const DATA_PATH = '/'+this.user.uid+'/items/'+today+'/data/';

    this.af.database.ref(DATA_PATH).update({
      user: {
        name: name
      }
    });
    this.navCtrl.push(HomePage);

  }

}
