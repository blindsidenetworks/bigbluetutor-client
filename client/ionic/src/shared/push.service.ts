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
      this.idToken = data.registrationId;
      ds.dsInstance.rpc.make('addDeviceToken', { username: this.ds.profileRecord.get('username'), deviceToken: data.registrationId, platform: 'android', version: 'ionic' }, () => {});
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

        this.nav.setRoot(Inbox);
      }
    });
    pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
  }
}
