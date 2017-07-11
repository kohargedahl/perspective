
import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { FabContainer} from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { RedditService } from "../../app/services/reddit.service";
import { DomSanitizer } from "@angular/platform-browser";
import 'rxjs/add/operator/map';

/**
 * Generated class for the Detail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})

export class Detail{
  @ViewChild(Content) content: Content;
  redditItems: any;
  category: any;
  article: any;
  wikipedia: any;
  twitter:any;
  summary:any;
  limit:number=2;
  youtubeURL :any;
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
  internationalSource:String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private iab: InAppBrowser, private redditService:RedditService, private domSanitizer : DomSanitizer) {
    this.article = navParams.get('article');
    this.youtubeURL = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube-nocookie.com/embed/' + this.article.fields.youtube + '?rel=0&amp;controls=0&amp;showinfo=0');
    this.getSummary(encodeURIComponent(this.article.fields.originalSource.url));
    this.getWikipediaData(this.article.fields.wikipediaTitle, 1);
    this.getTwitterData(this.article.fields.wikipediaTitle);
    this.getgdeltData(-6, this.article.fields.gdeltKeyword, 1);
    this.getgdeltData(3, this.article.fields.gdeltKeyword,1);
    this.internationalSource = this.article.fields.internationalSource;
    this.getgdeltIntData(this.internationalSource, this.article.fields.gdeltKeyword ,1);
    console.log(this.article);
  }

  private getSummary(url) {
    this.http.get("http://localhost:3000/process/" + url)
    .map(res => res.json()).subscribe(data => {
      console.log(data)
        this.summary = data.summary.replace(/\\"/g,'\"');
        this.summary = this.summary.substring(1, this.summary.length -1);
        this.nthMostCommon(this.summary);
        this.getDefaults();
        this.getPosts(this.category, this.limit);
 
    });
  }
  
  private nthMostCommon(string) {
    var newstring = [];
    string = string.replace (/,/g, "");
    string = string.replace(/\./g, "");
   // string = string.replace(/\’/g, "");
    string = string.replace(/\’s/g, "");

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

    function mode(array) {
      if(array.length == 0)
        return null;
      var modeMap = {};
      var maxEl = array[0], maxCount = 1;
      for(var i = 0; i < array.length; i++) {
        var el = array[i];
        if(modeMap[el] == null) {
          modeMap[el] = 1;
        }
        else {
          modeMap[el]++;
        }
        if(modeMap[el] > maxCount) {
          maxEl = el;
          maxCount = modeMap[el];
        }
      }
      return maxEl;
    }
  }

  private getDefaults() { 
      this.limit = 2;
  }

  private getPosts(category, limit){
    this.redditService.getPosts(category, limit).subscribe(response => {
      this.redditItems = response.data.children;
    });
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
      try {
        this.wikipedia = data.query.pages;
        for (var key in this.wikipedia) {
          this.wikipedia_Array.push(this.wikipedia[key]);
        }
      } catch (error) {
        this.wikipedia = ""; 
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
    try {
      cordova.InAppBrowser.open(url, '_blank', 'location=yes');
    } catch (error) {
      window.open(url);
    }
  }

  private closeFab (fab: FabContainer) {
   fab.close ();
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
