import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { OnboardingPage } from '../onboarding/roleChoice/roleChoice';
import { CreateUsernamePage } from '../createusername/createusername'
import { DsService } from '../../shared/ds.service';
import { GooglePlus } from '@ionic-native/google-plus';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username: string;
  googleID: string;
  password: string;
  browser: any;
  constructor(public navCtrl: NavController, private ds: DsService, private googlePlus: GooglePlus) {
  }

  login() {
    this.ds.login({ username: this.username, password: this.password }, this.handleLogin.bind(this));
  }

  handleLogin(success, data) {
    if(success) {
      this.ds.dsInstance.record.has("profile/"+this.username, this.linkProfile.bind(this));
    }else {
      console.log(success);
    }
  }

  linkProfile(error, hasRecord) {
    var record = this.ds.getRecord("profile/"+this.username);
    if(!hasRecord) {
      record.set({
        username: this.username,
        password: '',
        stars: [],
        pendingMeetings: [],
        requestMeetings: [],
        messages: {},
        profilePic: "http://www.freeiconspng.com/uploads/msn-people-person-profile-user-icon--icon-search-engine-16.png",
        meeting: ""
      });
      this.ds.profileRecord = record;
      this.ds.dataRecord = this.ds.getRecord("data")
      this.ds.dataRecord.whenReady(() => {
        this.goToOnboarding();
      })
    } else {
      this.ds.profileRecord = record;
      this.ds.dataRecord = this.ds.getRecord("data")
      this.ds.dataRecord.whenReady(() => {
        this.goToHome();
      });
    }
  }

  googleLogin()
  {
    this.googlePlus.login({webClientId: "591220975174-hqfbvf7iuegj6nf1h6jkldeuh3ia72v7.apps.googleusercontent.com", offline: true}).then(res =>
    {
      this.googleID = res.userId;
      this.ds.login({idToken: res.idToken}, this.handleGoogleLogin.bind(this));
    }).catch(error =>
    {
      console.log("Login error:", error);
    });
  }

  handleGoogleLogin(success, data) {
    console.log(success);
    if(success) {
      this.ds.dsInstance.record.has("googleID/"+this.googleID, this.linkGoogleProfile.bind(this));
    }
  }

  linkGoogleProfile(error, hasRecord) {
    if(!hasRecord) {
      this.goToCreateUsername();
    } else {
      this.ds.getRecord("googleID/"+this.googleID).whenReady(googleRecord =>
      {
        var user = googleRecord.get();
        if(user && user.username && user.googleID)
        {
          this.ds.getRecord(googleRecord.get("username")).whenReady(profileRecord =>
          {
            this.ds.profileRecord = profileRecord;
            this.ds.getRecord("data").whenReady(dataRecord =>
            {
              this.ds.dataRecord = dataRecord;
              if(!profileRecord.get("onboardingComplete"))
                this.goToHome();
              else
                this.goToHome();
            });
          });
        }
      });
    }
  }

  googleLogout()
  {
    //this.ds.dsInstance.close();
    this.googlePlus.logout().then(() =>
    {
      console.log("Logged out of Google Account");
    });
  }

  goToCreateUsername()
  {
    this.navCtrl.setRoot(CreateUsernamePage, {googleID: this.googleID});
  }

  goToOnboarding() {
    this.navCtrl.setRoot(OnboardingPage);
  }

  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }
}
