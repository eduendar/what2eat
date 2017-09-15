import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from "../../app/auth.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private authService: AuthService) {

  }

  logout(){
    console.log("test");
    this.authService.logout();
  }

}
