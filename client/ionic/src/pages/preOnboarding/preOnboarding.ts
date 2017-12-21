/*
BigBlueButton open source conferencing system - http://www.bigbluebutton.org/

Copyright (c) 2017 BigBlueButton Inc. and by respective authors (see below).

This file is part of BigBlueTutor.

BigBlueTutor is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

BigBlueTutor is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with BigBlueTutor.  If not, see <http://www.gnu.org/licenses/>.
*/
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TutorRegister } from '../onboarding/tutorRegister/tutorRegister'
import { DsService } from '../../shared/ds.service';

@Component({
  selector: 'page-preOnboarding',
  templateUrl: 'preOnboarding.html',
})
export class PreOnboarding {
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public menuCtrl:MenuController, public navParams:NavParams, private ds: DsService) {
  }


  ionViewWillEnter() {
    this.menuCtrl.swipeEnable(false)
  }

  onboard(i) {
    if (i) {
      this.navCtrl.setRoot(LoginPage);
    } else {
      this.slides.slideTo(2, 500);
    }
  }
}
