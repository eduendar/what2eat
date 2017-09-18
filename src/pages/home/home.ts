import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from "../../app/auth.service";
import { OrderPage } from "../order/order";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  from: {label:string, link:string} = {
    label: "Pizzaria con Chipola",
    link: "www.google.de/?q='such selber'"
  }

  constructor(public navCtrl: NavController, private authService: AuthService) {

  }

  openOrderPage() {
    this.navCtrl.push(OrderPage);
  }

  logout(){
    console.log("test");
    this.authService.logout();
  }

}
