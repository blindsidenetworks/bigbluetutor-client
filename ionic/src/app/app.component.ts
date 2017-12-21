/*
BigBlueButton open source conferencing system - http://www.bigbluebutton.org/

Copyright (c) 2017 BigBlueButton Inc. and by respective authors (see below).

This file is part of BigBlueTutor.

BigBlueTutor is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

BigBlueTutor is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with BigBlueTutor.  If not, see <http://www.gnu.org/licenses/>.
*/
import {Component, ViewChild} from '@angular/core';
import {Platform, MenuController, Nav, Events, AlertController} from 'ionic-angular';
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
  pages: Array<{title: string, component: any, highlight:any}>;

   constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage, public menu: MenuController, private ps:PushService, private os:OAuthService, private ds:DsService, public events: Events, private alertCtrl: AlertController) {
    this.pages = [
      {title: "Home", component: HomePage, highlight: false},
      {title: "Profile", component: ProfilePage, highlight: false},
      {title: "Inbox", component: Inbox, highlight: false},
      {title: "Logout", component: undefined, highlight: false}
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

  menuOpened() {
    var count = 0;
    var newMessages = this.ds.profileRecord.get('newMessagesCount');
    for (var message in newMessages) {
      if(newMessages[message]) {
        count++;
      }
    }
    this.pages[2].highlight = count;
    this.events.subscribe('user:newMessage', () => {
      count = 0;
      newMessages = this.ds.profileRecord.get('newMessagesCount');
      for (var message in newMessages) {
        if(newMessages[message]) {
          count++;
        }
      }
      this.pages[2].highlight = count;
    });
  }

  menuClosed() {
    this.events.unsubscribe('user:newMessage', () => {});
  }

  openPage(page)
  {
    this.menu.close();
    if(page.component) {
      this.nav.setRoot(page.component);
    } else {
      let alert = this.alertCtrl.create({
        title: 'Confirm Logout',
        message: 'Are you sure you want to logout? You will no longer receive notications!',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Confirm',
            handler: () => {
              this.ds.dsInstance.rpc.make('removeDeviceToken', {username: this.ds.profileRecord.get('username'), deviceToken:this.ps.idToken}, () => {
                this.os.googleLogout();
                this.nav.setRoot(LoginPage);
              })
            }
          }
        ]
      });
      alert.present();
    }
  }
}
