import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {MattDamon} from '../../pipes/url-filter';
import {Subscription} from "rxjs/Subscription";

/**
 * Generated class for the Detail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

//declare var Trump: string;

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',


})
export class Detail {
  article: any;
  wikipedia: any;
  wikipedia_Array: any[] = [];
  gdeltPos: string;
  gdeltHeaderPos: string;
  gdeltNeg: string;
  gdeltHeaderNeg: string;
  gdeltInt: string;
  gdeltHeaderInt: string;
  gdelt_ArrayPos: any [] = [];
  gdelt_ArrayNeg: any [] = [];
  myString: any;
  str: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.article = navParams.get('article');
    //this.getWikipediaData(this.article.fields.wikipediaTitle, 1);
    this.getgdeltData(-6,"trump", 1);
    this.getgdeltData(3,"trump",1);
    this.getgdeltIntData("Nigeria","trump",1);
    console.log(this.article);

  }

  private getgdeltData(tone,keyword, rows) {
    //This should be in a service!
    let urlTone = "";
    if(tone > 0) {
      urlTone = "tonemorethan:" + tone;
    } else {
      urlTone = "tonelessthan:" + tone;
    }



    this.http.get("http://localhost:8100/gdelt?" +
    "query=sourcelang:english+"+urlTone+"+"+ keyword+ "&dropdup=true&maxrows=" +rows +"")
      .subscribe(data=> {

       if(tone > 0) {
         this.gdeltHeaderPos = data['_body'].match(/<B>(.*?)<\/B>/g)[0].replace(/<\/?B>/g,'');
         this.gdeltPos = data['_body'].match(/window.open\('(.*?)'\)/g)[0].replace("window.open('", "").replace("')", '');
       } else {
         this.gdeltHeaderNeg = data['_body'].match(/<B>(.*?)<\/B>/g)[0].replace(/<\/?B>/g,'');
         this.gdeltNeg = data['_body'].match(/window.open\('(.*?)'\)/g)[0].replace("window.open('", "").replace("')", '');
       }

      },
       err => {
          console.log("Oops!");
       }
      );
  }

  private getgdeltIntData(sourcecountry,keyword, rows) {
    this.http.get("http://localhost:8100/gdelt?" +
    "query=sourcelang:english+sourcecountry:"+sourcecountry+"+"+keyword+"&output=artlist&dropdup=true&maxrows="+rows +"")
      .subscribe(data=> {

      this.gdeltHeaderInt = data['_body'].match(/<B>(.*?)<\/B>/g)[0].replace(/<\/?B>/g,'');
      this.gdeltInt = data['_body'].match(/window.open\('(.*?)'\)/g)[0].replace("window.open('", "").replace("')", '');
    })

  }

  private getWikipediaData(searchTerm, limit) {
    this.http.get("http://localhost:8100/wikipedia?action=query&format=json&generator=search" +
      "&gsrsearch=" + searchTerm + "&gsrnamespace=0&gsrlimit=" + limit + "&prop=extracts|pageimages&exchars=200&exlimit=max&" +
      "explaintext=true&exintro=true&piprop=thumbnail&pilimit=max&pithumbsize=200", {
      headers: new Headers({
        'Content-Type': 'jsonp'
      })
    }).map(res => res.json()).subscribe(data => {
      this.wikipedia = data.query.pages;
      for (var key in this.wikipedia) {
        console.log(key);
        this.wikipedia_Array.push(this.wikipedia[key]);
      }
    });
  }

  openInInApp(url) {
    /*

     import { InAppBrowser } from '@ionic-native/in-app-browser';

     iab from constructor

     const browser = this.iab.create('https://ionicframework.com/');

     const browser = this.iab.create(url);

     */
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad Detail');
  }




}
