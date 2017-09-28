import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { OnboardingPage } from '../onboarding/roleChoice/roleChoice';
import { DsService } from '../../shared/ds.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username;
  password;
  constructor(public navCtrl: NavController, public menuCtrl:MenuController, private ds: DsService) {

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

  goToOnboarding() {
    this.navCtrl.setRoot(OnboardingPage);
  }

  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }

  ionViewWillEnter() {
    this.menuCtrl.swipeEnable( false )
  }
}
