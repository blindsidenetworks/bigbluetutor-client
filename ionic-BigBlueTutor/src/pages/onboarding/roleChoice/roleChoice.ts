import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { HomePage } from '../../home/home';
import { TutorRegister } from '../../tutorRegister/tutorRegister'
import { DsService } from '../../../shared/ds.service';

@Component({
  selector: 'page-onboarding',
  templateUrl: 'roleChoice.html',
})
export class OnboardingPage {
  constructor(public navCtrl: NavController, public navParams:NavParams,public menuCtrl:MenuController, private ds: DsService) {
  }

  student() {
    this.navCtrl.setRoot(HomePage);
  }

  tutor() {
    this.navCtrl.push(TutorRegister);
  }
  
  ionViewWillEnter() {
    this.menuCtrl.swipeEnable( false )
  }
  //Enable swipe again
  ionViewDidLeave() {
   this.menuCtrl.swipeEnable( true )
  }
}
