import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
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
    this.ds.dsInstance.rpc.make('registerTutor', {auth:this.ds.auth}, ()=> {})
    this.navCtrl.setRoot(HomePage);
  }

}
