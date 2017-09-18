import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TutorRegister } from '../tutorRegister/tutorRegister'
import { DsService } from '../../shared/ds.service';

@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {
  constructor(public navCtrl: NavController, public navParams:NavParams, private ds: DsService) {
  }

  student() {
    this.navCtrl.setRoot(HomePage);
  }

  tutor() {
    this.navCtrl.push(TutorRegister)
  }

}
