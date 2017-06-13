import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from "../home/home";
import { TabsPage } from "../tabs/tabs";
import { NativeStorage } from '@ionic-native/native-storage';
import { Facebook } from '@ionic-native/facebook';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  FB_APP_ID: number = 1963235260577512;

  constructor(public navCtrl: NavController, public facebook: Facebook, public nativeStorage: NativeStorage) {
    this.nativeStorage = nativeStorage;
    facebook.browserInit(this.FB_APP_ID, "v2.8");
  }

  doFakeLogin(){
    let nav = this.navCtrl;
    nav.push(TabsPage);
  }

  doFbLogin(){
    let permissions = new Array<string>();
    let nav = this.navCtrl;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];

    this.facebook.login(permissions)
      .then(function(response){
        let userId = response.authResponse.userID;
        let params = new Array<string>();

        //Getting name and gender properties
        this.facebook.api("/me?fields=name,gender", params)
          .then(function(user) {
            user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
            //now we have the users info, let's save it in the NativeStorage
            this.nativeStorage.setItem('user',
              {
                name: user.name,
                gender: user.gender,
                picture: user.picture
              })
              .then(function(){
                nav.push(HomePage);
              }, function (error) {
                console.log(error);
              })
          })
      }, function(error){
        console.log(error);
      });
  }
}
