import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../home/home';
import { DsService } from '../../../shared/ds.service';
import { ToastController } from 'ionic-angular';
import {OnboardingPage} from '../onboarding/onboarding';
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
    this.ds.dsInstance.rpc.make('registerTutor', {username: this.ds.profileRecord.get("username"), categories: selected}, ()=> {});
    this.navCtrl.push(OnboardingPage);
  }

}
