import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'reddits-detail',
  templateUrl: 'details-reddit.html'
})

export class DetailsReddit {
  item: any;

  constructor(public navCtrl: NavController, public params: NavParams) {

    this.item = params.get ('item');
    console.log(this.item);
  }

}
