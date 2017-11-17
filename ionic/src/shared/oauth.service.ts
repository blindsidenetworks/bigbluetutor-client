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
