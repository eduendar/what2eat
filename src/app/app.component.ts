import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import * as firebase from 'firebase';
import { Observable } from "rxjs/Observable";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  user: Observable<firebase.User>

  constructor(platform: Platform, statusBar: StatusBar,
     splashScreen: SplashScreen, afAuth: AngularFireAuth) {

      this.user = afAuth.authState;
      this.user.subscribe( (user) => {
        console.log(user);
        if (!user){
          this.rootPage = LoginPage;
        }else{
          this.rootPage = TabsPage;
        }
      });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
