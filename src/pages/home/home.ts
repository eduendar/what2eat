import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from "../../app/auth.service";
import { OrderPage } from "../order/order";
import { AngularFireDatabase } from "angularfire2/database";

import 'rxjs/add/operator/map';
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items = [];
  userList = [];
  provider: {link:string, label:string} = null;


  constructor(
    public navCtrl: NavController,
    private authService: AuthService,
    private af: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth
  ) {}

  ionViewDidLoad(){
    const d = new Date();
    const today = d.getDate().toString() + (d.getMonth() + 1).toString() + d.getFullYear().toString();

    this.firebaseAuth.auth.onAuthStateChanged( (loggedUser) => {
      console.log(loggedUser);
      if (loggedUser){

        this.af.database.ref('/provider').once('value').then( provider => {
          provider = provider.val();
          this.provider = provider;
        });
    
        this.af.database.ref('/items/'+today).on('value', (items) => {
          this.items = items.val();
          this.af.database.ref('users').once('value').then( (users) => {
            users = users.val();
            console.log(users);
            this.items.map( ( elements) => {
              return elements['user'] = users.filter( x => x.uid === elements.uid)[0];
            })
          } );
          
          console.log(this.items);
        });

      }else{

      }

    });

    
  }

  openOrderPage() {
    this.navCtrl.push(OrderPage);
  }

  logout() {
    console.log("test");
    this.authService.logout();
  }

}
