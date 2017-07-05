import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { FabContainer} from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { InAppBrowser } from "@ionic-native/in-app-browser";
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
  @ViewChild(Content) content: Content;
  article: any;
  wikipedia: any;
  twitter:any;
  summary:any;
  wikipedia_Array: any[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private iab: InAppBrowser) {
    
    this.article = navParams.get('article');
    this.getWikipediaData(this.article.fields.wikipediaTitle, 1);
    this.getTwitterData(this.article.fields.wikipediaTitle);
    this.getSummary(encodeURIComponent(this.article.fields.sources[0]));
    console.log(this.article);
  }

  private getSummary(url) {
    this.http.get("http://localhost:3000/process/" + url)
    .map(res => res.json()).subscribe(data => {
      console.log(data)
        this.summary = data.summary;
    });
  }

  private getWikipediaData(searchTerm, limit) {
    this.http.get("http://localhost:8100/wikipedia/w/api.php?action=query&format=json&generator=search" +
      "&gsrsearch=" + searchTerm + "&gsrnamespace=0&gsrlimit=" + limit + "&prop=extracts|pageimages&exchars=200&exlimit=max&" +
      "explaintext=true&exintro=true&piprop=thumbnail&pilimit=max&pithumbsize=200", {
      headers: new Headers({
        'Content-Type': 'jsonp'
      })
    }).map(res => res.json()).subscribe(data => {
      console.log(data);
      this.wikipedia = data.query.pages;
      for (var key in this.wikipedia) {
        this.wikipedia_Array.push(this.wikipedia[key]);
      }
    });
  }

  private getTwitterData(searchTerm) {
    this.http.get("http://localhost:3000/twitter/" + searchTerm, {
      headers: new Headers({
        'Content-Type': 'json'
      })
    }).map(res => res.json()).subscribe(data => {
      this.twitter = data.statuses;
    });
  }

  private loadUrl(url) {
    this.iab.create(url);
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  scrollTo(element:string, fab: FabContainer) {
    fab.close();
    let yOffset = document.getElementById(element).offsetTop;
    this.content.scrollTo(0, yOffset, 4000)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Detail');
  }


}
