import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DsService } from '../../shared/ds.service';

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
    this.ds.dsInstance.rpc.make('registerTutor', {auth:this.ds.auth, categories: selected}, ()=> {})
    this.navCtrl.setRoot(HomePage);
  }

}
