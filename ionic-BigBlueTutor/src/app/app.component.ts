import {Component, ViewChild} from '@angular/core';
import {Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import {HomePage} from '../pages/home/home';
import {PreOnboarding} from '../pages/preOnboarding/preOnboarding';
import {Inbox} from '../pages/inbox/inbox';
import {ProfilePage} from '../pages/profilepage/profilepage';
import {LoginPage} from '../pages/login/login';
import {ENV} from '../config/env';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  //rootPage:any = LoginPage;
  rootPage:any = LoginPage;
  pages: Array<{title: string, component: any}>;



   constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage, public menu: MenuController, public push: Push) {
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
      this.initPushNotification();
    });
  }

  initPushNotification() {
      if (!this.platform.is('cordova')) {
        console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
        return;
      }
      const options: PushOptions = {
        android: {
          senderID: ENV.senderId
        },
        ios: {
          alert: 'true',
          badge: false,
          sound: 'true'
        },
        windows: {}
      };
      const pushObject: PushObject = this.push.init(options);

      pushObject.on('registration').subscribe((data: any) => {
        console.log('device token -> ' + data.registrationId);
        //TODO - send device token to server
      });

      pushObject.on('notification').subscribe((data: any) => {
        console.log('message -> ' + data.message);
        //if user using app and push notification comes
        if (data.additionalData.foreground) {
          // if application open, show popup
          /*let confirmAlert = this.alertCtrl.create({
            title: 'New Notification',
            message: data.message,
            buttons: [{
              text: 'Ignore',
              role: 'cancel'
            }, {
              text: 'View',
              handler: () => {
                //TODO: Your logic here
                //this.nav.push(DetailsPage, { message: data.message });
              }
            }]
          });
          confirmAlert.present();
          */
        } else {
          //if user NOT using app and push notification comes
          //TODO: Your logic on click of push notification directly
          //this.nav.push(DetailsPage, { message: data.message });
          console.log('Push notification clicked');
        }
      });

      pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
    }

  openPage(page)
  {
    this.menu.close();
    this.nav.setRoot(page.component);
  }
}
