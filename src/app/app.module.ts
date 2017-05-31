import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HttpModule } from '@angular/http';

import { AboutPage } from '../pages/about/about';
import { UserPage } from '../pages/UserPage/UserPage';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Detail } from '../pages/detail/detail';
import { WikipediaPage } from '../pages/wikipedia/wikipedia';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Login} from "../pages/login/login";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    UserPage,
    HomePage,
    TabsPage,
    Login,
    Detail
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    UserPage,
    HomePage,
    TabsPage,
    Login,
    Detail
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
