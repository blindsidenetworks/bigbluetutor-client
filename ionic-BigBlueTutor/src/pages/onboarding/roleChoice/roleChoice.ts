import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { HomePage } from '../../home/home';
import { TutorRegister } from '../tutorRegister/tutorRegister'
import { DsService } from '../../../shared/ds.service';
import {OnboardingPage} from '../onboarding/onboarding';

@Component({
  selector: 'page-roleChoice',
  templateUrl: 'roleChoice.html',
})
export class RoleChoice {
  constructor(public navCtrl: NavController, public navParams:NavParams,public menuCtrl:MenuController, private ds: DsService) {
  }

  student() {
    this.navCtrl.setRoot(OnboardingPage);
  }

  tutor() {
    this.navCtrl.push(TutorRegister);
  }
}
