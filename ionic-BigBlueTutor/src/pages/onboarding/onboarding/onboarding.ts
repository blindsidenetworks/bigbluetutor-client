import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, Slides } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';
import { TutorRegister } from '../tutorRegister/tutorRegister'
import { HomePage } from '../../home/home'
import { DsService } from '../../../shared/ds.service';
// import { PushService } from '../../../shared/push.service';
import * as $ from 'jquery';

@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {
  @ViewChild(Slides) slides: Slides;
  bio: string;
  accept: any;
  constructor(public navCtrl: NavController, public navParams:NavParams,public menuCtrl:MenuController, private ds: DsService, /*private ps: PushService,*/ private appPreferences: AppPreferences) {
  }

  register() {
<<<<<<< HEAD
    if(this.navParams.get("categories"))
    {
      this.ds.dsInstance.rpc.make('registerTutor', {username: this.ds.profileRecord.get("username"), categories: this.navParams.get("categories")}, ()=> {
        this.finishOnboarding();
      });
    }
    else
    {
=======
    if(this.navParams.get("categories")) {
      this.ds.dsInstance.rpc.make('registerTutor', {username: this.ds.profileRecord.get("username"), categories: this.navParams.get("categories")}, ()=> {
        this.navCtrl.setRoot(HomePage);
        this.finishOnboarding();
      });
    } else {
      this.navCtrl.setRoot(HomePage);
>>>>>>> 973d1e325bac513e84e4cc298b68b9901fbca9b8
      this.finishOnboarding();
    }
  }

<<<<<<< HEAD
  finishOnboarding()
  {
      this.ds.dsInstance.rpc.make('changeDescription', {username: this.ds.profileRecord.get("username"), description: this.bio}, () => {
        //do additional calls first
        this.appPreferences.fetch('username').then((res) => {
          if (this.ds.profileRecord.get('username') != res) {
            this.appPreferences.store('username', this.ds.profileRecord.get('username'));
            // this.ps.initPushNotification(this.ds);
          }
          this.ds.profileRecord.set("onboardingComplete", true);
          this.navCtrl.setRoot(HomePage);
        });
      });
=======
  finishOnboarding() {
    this.ds.dsInstance.rpc.make('changeDescription', {username: this.ds.profileRecord.get("username"), description: this.bio}, () => {
      //do additional calls first
      this.ds.profileRecord.set("onboardingComplete", true);
      this.ps.initPushNotification(this.ds);
    });
>>>>>>> 973d1e325bac513e84e4cc298b68b9901fbca9b8
  }

  bioInput() {
    $('.bioInput').css('border-color','#5576FF');
  }

  next() {
    this.slides.slideTo(2, 500);
  }
}
