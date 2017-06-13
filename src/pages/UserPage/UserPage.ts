import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Facebook } from '@ionic-native/facebook';
import { Login } from '../login/login';

@Component({
  selector: 'page-user',
  templateUrl: 'UserPage.html'
})

export class UserPage {

  user: any;
  userReady: boolean = false;

  constructor(public navCtrl: NavController, public nativeStorage: NativeStorage, public facebook: Facebook) {}

  ionViewCanEnter(){
    let env = this;
    this.nativeStorage.getItem('user')
      .then(function (data){
        env.user = {
          name: data.name,
          gender: data.gender,
          picture: data.picture
        };
        env.userReady = true;
      }, function(error){
        console.log(error);
      });
  }

  doFbLogout(){
    var nav = this.navCtrl;
    this.facebook.logout()
      .then(function(response) {
        //user logged out so we will remove him from the NativeStorage
        this.nativeStorage.remove('user');
        nav.push(Login);
      }, function(error){
        console.log(error);
      });
  }
}
