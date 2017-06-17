import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { UserPage } from '../UserPage/UserPage';
import { HomePage } from '../home/home';
import { RedditsPage } from '../reddits/reddits';
import {SettingsPage} from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = UserPage;
  tab4Root = RedditsPage;
  tab5Root = SettingsPage;

  constructor() {

  }
}
