import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { ProfilePage } from '../profilepage/profilepage';
import { UserPage } from '../userpage/userpage';
import { Category } from '../category/category';
import { DsService } from '../../shared/ds.service';
import { RecordListenService } from '../../shared/recordlisten.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private search;
  categories;
  tutors;
  tutorsData;
  constructor(public navCtrl: NavController, public events: Events, private ds: DsService, private rls:RecordListenService) {
    var categoryData = ds.dataRecord.get('categories');
    this.categories = [];
    this.tutorsData = {};
    this.tutors = {};
    for (var category in categoryData) {
      this.categories.push(category);
      ds.dsInstance.rpc.make('search/tutor', {subject:category}, function(error, data) {
        this.tutorsData[data.subject] = data.data;
        this.tutors[data.subject] = data.data;
      }.bind(this));
      ds.dsInstance.event.subscribe('tutor/'+category, function(data) {
        this.tutorsData[data.subject] = data.data;
        this.tutors[data.subject] = data.data;
      }.bind(this));
    }
  }

  onInput(event) {
    var categoryData = this.ds.dataRecord.get('categories');
    this.categories = [];
    for (var category in categoryData) {
      var subCategories = categoryData[category];
      for (var i =0;i<subCategories.length;i++) {
        this.categories.push(subCategories[i]);
      }
    }
    this.categories = this.categories.filter(function(text) {
      return text.includes(this.search);
    }.bind(this));

//    this.tutors = tutorsData.filter(function(text) {
//      return text.includes(this.search);
//    }.bind(this));
  }

  categorySelected(category) {
    this.navCtrl.setRoot(Category, {category:category});
  }

  userSelected(tutor) {
    if (tutor === this.ds.profileRecord.get('username')) {
      this.navCtrl.push(ProfilePage);
    }else {
      this.navCtrl.setRoot(UserPage, {user:tutor});
    }
  }

}
