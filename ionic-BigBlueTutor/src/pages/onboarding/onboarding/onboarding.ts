import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, Slides } from 'ionic-angular';
import { TutorRegister } from '../tutorRegister/tutorRegister'
import { HomePage } from '../../home/home'
import { DsService } from '../../../shared/ds.service';
import * as $ from 'jquery';

@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {
  @ViewChild(Slides) slides: Slides;
  bio: string;
  accept: any;
  constructor(public navCtrl: NavController, public navParams:NavParams,public menuCtrl:MenuController, private ds: DsService) {
  }

  register() {
    if(this.navParams.get("categories"))
    {
      this.ds.dsInstance.rpc.make('registerTutor', {username: this.ds.profileRecord.get("username"), categories: this.navParams.get("categories")}, ()=> {
        this.finishOnboarding();
      });
    }
    else
    {
      this.finishOnboarding();
    }
  }

  finishOnboarding()
  {
      this.ds.dsInstance.rpc.make('changeDescription', {username: this.ds.profileRecord.get("username"), description: this.bio}, () => {
        //do additional calls first
        this.ds.profileRecord.set("onboardingComplete", true);
        this.navCtrl.setRoot(HomePage);
      });
  }

  bioInput() {
    $('.bioInput').css('border-color','#5576FF');
  }

  next() {
    this.slides.slideTo(2, 500);
  }
}
