import { Injectable } from '@angular/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Inbox } from '../pages/inbox/inbox';
import { Platform } from 'ionic-angular';
import { OAuthService } from './oauth.service';
import { DsService } from './ds.service';
import { ENV } from '../config/env';

@Injectable()
export class PushService {
  nav;
  idToken;
  username;

  constructor(public push:Push, public platform: Platform, private os:OAuthService, private ds: DsService) {
  }

  initPushNotification(ds) {
    console.log(ds);
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }
    const options: PushOptions = {
      android: {
        senderID:ENV.senderId
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
      ds.profileRecord.set('deviceToken', data.registrationId);
    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('message -> ' + data.message);
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, do something
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        //this.nav.push(DetailsPage, { message: data.message });

        this.os.googleLogin((id) => {
          this.idToken = id;
          this.ds.login({idToken: this.idToken}, (success, data) => {
            if(success && data && data.username) {
              this.username = data.username;
              this.ds.dsInstance.record.has("profile/"+this.username, (error, hasRecord) => {
                if (hasRecord) {
                  this.ds.getRecord("profile/"+this.username).whenReady(profileRecord => {
                    this.ds.profileRecord = profileRecord;
                    this.ds.getRecord("data").whenReady(dataRecord => {
                      this.ds.dataRecord = dataRecord;
                      if(profileRecord.get("onboardingComplete"))
                        this.nav.setRoot(Inbox);
                    });
                  });
                } else {

                }
              });
            }
          });
        });
        console.log('Push notification clicked');
      }
    });
    pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
  }
}
