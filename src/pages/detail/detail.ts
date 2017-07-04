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
  gdelt: any;
  gdelt_Array: any [] = [];



  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.article = navParams.get('article');
    this.getWikipediaData(this.article.fields.wikipediaTitle, 1);
    this.getgdeltData(this.article.fields.wikipediaTitle,2);
    console.log(this.article);

  }

  private getgdeltData(keyword, rows) {
    this.http.get("http://api.gdeltproject.org/api/v1/search_ftxtsearch/search_ftxtsearch?" +
    "query=sourcelang:english+tonelessthan:-6+"+ keyword+ "&output=urllist&dropdup=true&maxrows=" +rows +"")
      .subscribe(data=> {

        this.gdelt = data;
      },
       err => {
          console.log("Oops!");
       }
      );
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



  ionViewDidLoad() {
    console.log('ionViewDidLoad Detail');
  }


}
