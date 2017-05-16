import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
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
  wikipedia: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.article = navParams.get('article');
    var authHeader = new Headers();
    authHeader.append('Content-Type','jsonp');
    this.getWikipediaData("Erdogan", authHeader);
    console.log(this.article);

  }

  private getWikipediaData(searchTerm, authHeader) {
    this.http.get("http://localhost:8100/wikipedia?action=query&format=json&generator=search" +
      "&gsrsearch="+ searchTerm +"&gsrnamespace=0&gsrlimit=10&prop=extracts|pageimages&exchars=200&exlimit=max&" +
      "explaintext=true&exintro=true&piprop=thumbnail&pilimit=max&pithumbsize=200",{
      headers: new Headers({
        'Content-Type': 'jsonp'
      })
    }).map(res => res.json()).subscribe(data => {
      this.wikipedia = data.query.pages;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Detail');
  }

}
