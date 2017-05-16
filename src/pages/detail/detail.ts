import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
  posts: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.article = navParams.get('article');
    console.log(this.article);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Detail');
  }

}
