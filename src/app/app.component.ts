import { Component, ViewChild } from '@angular/core';
import { Platform, Nav} from 'ionic-angular';
import { StatusBar, Splashscreen, NativeStorage } from 'ionic-native';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ContentfulService } from './services/contentful.service'
import { TabsPage } from '../pages/tabs/tabs';

import { Login } from '../pages/login/login';
import { UserPage } from '../pages/UserPage/UserPage';

@Component({
  templateUrl: 'app.html',
  providers: [ContentfulService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = TabsPage;

  constructor(platform: Platform, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Here we will check if the user is already logged in
      // because we don't want to ask users to log in each time they open the app
      let env = this;
      NativeStorage.getItem('user')
        .then( function (data) {
          // user is previously logged and we have his data
          // we will let him access the app
          env.nav.push(UserPage);
          Splashscreen.hide();
        }, function (error) {
          //we don't have the user data so we will ask him to log in
          env.nav.push(Login);
          Splashscreen.hide();
        });

      StatusBar.styleDefault();
    });
  }
}
