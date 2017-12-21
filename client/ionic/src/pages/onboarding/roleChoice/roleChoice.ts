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
