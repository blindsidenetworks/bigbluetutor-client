import {Component, ViewChild} from '@angular/core';
import {Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import {HomePage} from '../pages/home/home';
import {PreOnboarding} from '../pages/preOnboarding/preOnboarding';
import {Inbox} from '../pages/inbox/inbox';
import {ProfilePage} from '../pages/profilepage/profilepage';
import {LoginPage} from '../pages/login/login';
import {PushService} from '../shared/push.service';
import {OAuthService} from '../shared/oauth.service';
import {DsService} from '../shared/ds.service';
import {ENV} from '../config/env';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;
  pages: Array<{title: string, component: any}>;

   constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage, public menu: MenuController, private ps:PushService, private os:OAuthService, private ds:DsService) {
    this.pages = [
      {title: "Home", component: HomePage},
      {title: "Profile", component: ProfilePage},
      {title: "Inbox", component: Inbox}
    ];
    platform.ready().then(() => {

      this.storage.get('bbt').then((val) => {
        if (!val) {
          storage.set('bbt', true);
          this.rootPage = PreOnboarding;
        }
      })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      ps.nav = this.nav;
    });
  }

  openPage(page)
  {
    this.menu.close();
    this.nav.setRoot(page.component);
  }
}
