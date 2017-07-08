import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { InAppBrowser } from "@ionic-native/in-app-browser";
import 'rxjs/add/operator/map';
import {RedditService} from "../../app/services/reddit.service";
import {DetailsReddit} from "../details-reddit/details-reddit";

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
export class Detail implements OnInit{
  redditItems: any;
  category: any;
  article: any;
  wikipedia: any;
  twitter:any;
  limit:number=2;
  wikipedia_Array: any[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private iab: InAppBrowser,private redditService:RedditService) {
    this.article = navParams.get('article');
    this.nthMostCommon(this.article.fields.summary);
    //this.getWikipediaData(this.article.fields.wikipediaTitle, 1);
    //this.getTwitterData('Merkel');
  //  console.log(this.article);
    this.getDefaults();
  }
  ngOnInit(){

    this.getPosts(this.category, this.limit);
  }
  nthMostCommon(string) {
    var newstring = [];
    string = string.replace (/,/g, "");
    string = string.replace(/\./g, "");
    console.log(string);
    var wordsArray = string.split(/\s/);

    for (var i = 0; i < wordsArray.length; i++) {
      if(wordsArray[i].length>3 && /^[A-Z]/.test( (wordsArray[i]))){

        console.log(wordsArray[i]);
        newstring.push(wordsArray[i]);

      }
    }
    this.category = (mode(newstring));
    function removeLastComma(strng){
      var n=strng.lastIndexOf(",");
      var a=strng.substring(0,n)
      return a;
    }
    function mode(array)
    {
      if(array.length == 0)
        return null;
      var modeMap = {};
      var maxEl = array[0], maxCount = 1;
      for(var i = 0; i < array.length; i++)
      {
        var el = array[i];
        if(modeMap[el] == null)
          modeMap[el] = 1;
        else
          modeMap[el]++;
        if(modeMap[el] > maxCount)
        {
          maxEl = el;
          maxCount = modeMap[el];
        }
      }
      return maxEl;
    }


  }
  getDefaults(){
     
      this.limit = 10;
  }
  getPosts(category, limit){
    this.redditService.getPosts(category, limit).subscribe(response => {
      this.redditItems = response.data.children;
    });
  }

  viewItem(item){
    this.navCtrl.push(DetailsReddit, {
      item:item
    });
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
        //console.log(key);
        this.wikipedia_Array.push(this.wikipedia[key]);
      }
    });
  }

  private getTwitterData(searchTerm) {
    this.http.get("http://ec2-52-11-161-67.us-west-2.compute.amazonaws.com:3000/twitter/" + searchTerm, {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad Detail');
  }


}
