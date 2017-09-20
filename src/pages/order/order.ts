import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../app/auth.service';

import * as firebase from 'firebase';
import { HomePage } from "../home/home";
declare var moment: any;
/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  items = [];
  myOrder = {};
  DATA_PATH = '';

  private user: firebase.User;
  private today: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private af: AngularFireDatabase,
    private authService: AuthService
  ) {
    const d = new Date();
    this.today = d.getDate().toString() + (d.getMonth() + 1).toString() + d.getFullYear().toString();
    authService.user.subscribe((puser: firebase.User) => {
      this.user = puser;

      // /uid/19082017/items
      this.DATA_PATH = '/items/' + this.today;

      af.database.ref(this.DATA_PATH).once('value').then((data) => {

        this.items = (data.val())?data.val():[];

        this.items.forEach(element => {
          if (element.uid === this.user.uid) {
            this.myOrder = element;
          }
        });
        

      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  submit(label: string, price: string, description: string, tip: string) {

    let fail = [];
    if (label === ''){
      fail.push("Label is not valid");
    }

    if (price === '' || Number(price) <= 0.0){
      fail.push("Price is not valid");
    }

    if (!Number(tip)){
      fail.push("Tip is not valid");
    }

    let found: boolean = false;
    const newElement = {
      label,
      description,
      price,
      tip,
      uid: this.user.uid
    };

    this.items.forEach( (element, index) => {
      if (this.user.uid === element.uid){
        this.items[index] = newElement
        found = true;
      }
    });

    if (!found){
      this.items.push(newElement);
    }

    this.af.database.ref(this.DATA_PATH).set(this.items).then( () => {

      // this.navCtrl.push(HomePage);
      this.navCtrl.pop();
    });

  }

}
