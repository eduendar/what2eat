import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import * as firebase from 'firebase';
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase } from "angularfire2/database";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  user: Observable<firebase.User>

  constructor(platform: Platform, statusBar: StatusBar,
     splashScreen: SplashScreen, afAuth: AngularFireAuth, af: AngularFireDatabase) {
      
      afAuth.authState.subscribe( (user) => {
        
        if (!user){
          this.rootPage = LoginPage;
        }else{
          this.rootPage = TabsPage;
          // af.database.ref('/'+user.uid+'/').once('value').then( (initialData) => {
          //   console.log(initialData.val());
          //   if (!initialData.val()){
          //     let data = {};
          //     data[user.uid] = {
          //       user_id: user.uid,
          //       items: []
          //     }
          //     af.database.ref('/').set(data);
          //   }
          // });
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
