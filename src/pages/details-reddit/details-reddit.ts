import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'src/pages/detail-reddit/details-reddit.html'
})
export class DetailsReddit {
  item: any;

  constructor(public navCtrl: NavController, public params: NavParams) {
this.item = params.get ('item');
  }

}
