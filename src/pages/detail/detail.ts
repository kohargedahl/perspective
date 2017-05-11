import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Detail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class Detail {
  article: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.article = navParams.get('article');
    console.log(this.article);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Detail');
  }

}
