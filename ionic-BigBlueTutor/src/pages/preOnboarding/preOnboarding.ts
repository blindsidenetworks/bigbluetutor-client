import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TutorRegister } from '../onboarding/tutorRegister/tutorRegister'
import { DsService } from '../../shared/ds.service';

@Component({
  selector: 'page-preOnboarding',
  templateUrl: 'preOnboarding.html',
})
export class PreOnboarding {
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams:NavParams, private ds: DsService) {
  }

  onboard(i) {
    if (i) {
      this.navCtrl.setRoot(LoginPage);
    } else {
      this.slides.slideTo(2, 500);
    }
  }
}
