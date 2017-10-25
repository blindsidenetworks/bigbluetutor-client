<<<<<<< HEAD
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, Slides } from 'ionic-angular';
import { TabsPage } from '../../tabs/tabs';
=======
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
>>>>>>> afa671b6063f4ff48213a3be18115770a91012ad
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
    this.ds.dsInstance.rpc.make('changeDescription', {username: this.ds.profileRecord.get("username"), description: this.bio}, () => {})
    //do additional calls first
    this.navCtrl.setRoot(HomePage);
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
