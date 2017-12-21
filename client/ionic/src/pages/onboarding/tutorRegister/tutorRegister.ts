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
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../home/home';
import { DsService } from '../../../shared/ds.service';
import { ToastController } from 'ionic-angular';
import { OnboardingPage } from '../onboarding/onboarding';
import * as $ from 'jquery';

@Component({
  selector: 'page-tutorRegister',
  templateUrl: 'tutorRegister.html',
})
export class TutorRegister {
  categories;
  categoriesData;
  categoriesSelected;
  openCategory;
  constructor(public navCtrl: NavController, public navParams:NavParams, private ds: DsService) {
    this.categoriesData = ds.dataRecord.get('categories');
    this.categories = Object.keys(this.categoriesData);
    this.categoriesSelected = {};
    this.openCategory = "";
  }

  isOpen(category) {
    if (this.openCategory === category) {
      return true;
    }
    return false;
  }

  toggleCategories(category) {
    if (category === this.openCategory) {
      this.openCategory = ""
    }else {
      this.openCategory = category;
    }
  }

  tutor() {
    var selected = [];
    for (var category in this.categoriesSelected) {
      if(this.categoriesSelected[category]) {
        selected.push(category);
      }
    }
    this.navCtrl.push(OnboardingPage, {categories: selected});
  }

}
