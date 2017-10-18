import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { DsService } from '../../shared/ds.service';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profilepage/profilepage';
import { Inbox } from '../inbox/inbox';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  username: string;
  pages: Array<{title: string, icon: string, component: any}>;
  page:any;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, private ds: DsService) {
    this.username = this.ds.profileRecord.get("username");
    this.pages =
    [
      {title: "Home", icon: "home", component: HomePage},
      {title: "Inbox", icon: "mail", component: Inbox},
      {title: this.username, icon: "person", component: ProfilePage}
    ];
  }

  ionViewWillEnter() {
    this.menuCtrl.swipeEnable( false );
  }
}
