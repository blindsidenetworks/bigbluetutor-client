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
import { Platform } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { ENV } from '../config/env';

@Injectable()
export class OAuthService {
  idToken;
  username;
  cb;

  constructor(public platform: Platform, private googlePlus: GooglePlus) {
  }


  googleLogin(cb) {
    this.cb = cb;
    this.googlePlus.disconnect().then(() =>
    {
      console.log("Logged out of Google Account");
      this.googlePlus.login({webClientId: ENV.googleOAuthKey, offline: true}).then(res => {
        if(res) {
          cb(res.idToken);
        }
      }).catch(error => {
        console.log("Login error:", error);
      });
    }).catch(error => {
      console.log("Logout error:", error);
      this.googlePlus.login({webClientId: ENV.googleOAuthKey, offline: true}).then(res => {
        if(res) {
          cb(res.idToken);
        }
      }).catch(error => {
        console.log("Login error:", error);
      });
    });
  }


  googleLogout() {
    this.googlePlus.disconnect().then(() => {
      console.log("Logged out of Google Account");
    }).catch(error => {
      console.log("Logout error:", error);
    });
  }

  hasGooglePlusNative() {
    return (this.platform.is("ios") || this.platform.is("android")) && this.platform.is("cordova");
  }
}
