import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {RedditService} from '../../app/services/reddit.service';
import{RedditsPage} from'../reddits/reddits';
@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  category: any;
  limit: any;

  constructor(public navCtrl: NavController, private redditService: RedditService) {
    this.getDefaults();
  }


  getDefaults() {
    if (localStorage.getItem('category') != null) {
      this.category = localStorage.getItem('category');
    }
    else {
      this.category = 'brexit';
    }
  }
  if (localStorage.getItem('limit') != null) {
  this.limit = localStorage.getItem('limit');
}
else {
  this.limit = '3';
  }

  setDefaults() {
    localStorage.setItem('category', this.category);
    localStorage.setItem('limit', this.limits);
    this.navCtrl.push (RedditsPage);

  }
}
