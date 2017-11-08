import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AppPreferences } from '@ionic-native/app-preferences';
import { NavController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CreateUsernamePage } from '../createusername/createusername'
import { RoleChoice } from '../onboarding/roleChoice/roleChoice';
import { PushService } from '../../shared/push.service';
import { DsService } from '../../shared/ds.service';
import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';
import { ENV } from '../../config/env';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  username: string;
  password: string;
  idToken: string;
  browser: any;
  auth2: any;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public platform: Platform, private ds: DsService, private ps: PushService, private googlePlus: GooglePlus,  private storage: Storage, private appPreferences: AppPreferences) {
    this.username = this.password = this.idToken = "";
    //browser
    console.log("Native:", this.hasGooglePlusNative());
    if(!this.hasGooglePlusNative()) {
      gapi.load("auth2", () => {
        gapi.auth2.init({
          client_id: ENV.googleOAuthKey,
          scope: 'profile',
          fetch_basic_profile: true
        }).then((auth2) => {
          this.auth2 = auth2;
          this.auth2.attachClickHandler(document.getElementById('googleBrowser'),{}, profile => {
            if(profile) {
              this.idToken = profile.getAuthResponse().id_token;
              this.ds.login({idToken: this.idToken}, this.handleGoogleLogin.bind(this));
            }
          }, error => {
            console.log("Login error:", error);
          });
        }, (error) => {console.log(error)});
      });
    }
  }

  googleLogin() {
    this.googlePlus.disconnect().then(() =>
    {
      console.log("Logged out of Google Account");
      this.googlePlus.login({webClientId: ENV.googleOAuthKey, offline: true}).then(res => {
        if(res) {
          this.idToken = res.idToken;
          this.ds.login({idToken: this.idToken}, this.handleGoogleLogin.bind(this));
        }
      }).catch(error => {
        console.log("Login error:", error);
      });
    }).catch(error => {
      console.log("Logout error:", error);
      this.googlePlus.login({webClientId: ENV.googleOAuthKey, offline: true}).then(res => {
        if(res) {
          this.idToken = res.idToken;
          this.ds.login({idToken: this.idToken}, this.handleGoogleLogin.bind(this));
        }
      }).catch(error => {
        console.log("Login error:", error);
      });
    });
  }

  handleGoogleLogin(success, data) {
    console.log("Google login success:", success);
    if(success && data && data.username) {
      this.username = data.username;
      this.ds.dsInstance.record.has("profile/"+this.username, this.linkGoogleProfile.bind(this));
    }
    else if(data && data.needsUsername) {
      this.goToCreateUsername();
    }
  }

  linkGoogleProfile(error, hasRecord) {
    if(!hasRecord) {
      this.goToCreateUsername();
    } else {
      this.ds.getRecord("profile/"+this.username).whenReady(profileRecord => {
        this.ds.profileRecord = profileRecord;
        this.ds.getRecord("data").whenReady(dataRecord => {
          this.ds.dataRecord = dataRecord;
          this.appPreferences.fetch('username').then((res) => {
            if (this.ds.profileRecord.get('username') != res) {
              this.appPreferences.store('username', this.ds.profileRecord.get('username'));
              this.ps.initPushNotification(this.ds);
            }
            if(profileRecord.get("onboardingComplete"))
              this.goToHome();
            else
              this.goToOnboarding();
          })
        });
      });
    }
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

  goToCreateUsername() {
    this.navCtrl.setRoot(CreateUsernamePage, {idToken: this.idToken});
  }

  goToOnboarding() {
    this.navCtrl.setRoot(RoleChoice);
  }

  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }

  ionViewWillEnter() {
    this.menuCtrl.swipeEnable( false )
  }
}
