import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, Slides } from 'ionic-angular';
import { TabsPage } from '../../tabs/tabs';
import { TutorRegister } from '../tutorRegister/tutorRegister'
import { DsService } from '../../../shared/ds.service';
import * as $ from 'jquery';

@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {
  @ViewChild(Slides) slides: Slides;
  bio;
  accept;
  constructor(public navCtrl: NavController, public navParams:NavParams,public menuCtrl:MenuController, private ds: DsService) {
  }

  register() {
    this.ds.dsInstance.rpc.make('changeDescription', {username: this.ds.profileRecord.get("username"), description: this.bio}, () => {})
    //do additional calls first
    this.navCtrl.setRoot(TabsPage);
  }

  ionViewWillEnter() {
    this.menuCtrl.swipeEnable( false )
  }
  //Enable swipe again
  ionViewDidLeave() {
   this.menuCtrl.swipeEnable( true )
  }
  bioInput() {
    $('.bioInput').css('border-color','#5576FF');
  }

  next() {
    this.slides.slideTo(2, 500);
  }
}
