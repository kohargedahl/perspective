import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContentfulService } from '../../app/services/contentful.service';
import { Detail } from '../detail/detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
// in typescript when we create new variables we need to define them first
  articles: any;

  constructor(public navCtrl: NavController, public contentfulService: ContentfulService) {
    //this is cool.
  }

  itemSelected(item) {
    this.navCtrl.push(Detail,{
      article: item
    });
  }

  ngOnInit() {
    console.log('onInitRan');
    this.getArticles('article');

  }

  getArticles(category) {
    console.log(this.contentfulService.getArticles(category).then(response => {
      console.log(response);
      this.articles = response.items.slice().reverse();
    }));
  }
}
