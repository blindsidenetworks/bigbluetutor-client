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
    for (var category in categoryData) {
      var subCategories = categoryData[category];
      for (var i =0;i<subCategories.length;i++) {
        this.categories.push(subCategories[i]);
        var queryString = JSON.stringify({
          table: 'user',
          query: [
            ['tutor', 'eq', true]
          ]
        });
        var tutorList = this.ds.dsInstance.record.getList('search?'+ queryString);
        this.tutorsData[subCategories[i]] = [];
        var sub = subCategories[i];
        var self = this;
        tutorList.whenReady( function(tutorList) {
          var entries = arguments[1].getEntries();
          for (var entry in entries) {
            this.ds.dsInstance.record.snapshot('user/'+entries[entry], function(error,data) {
              var user = arguments[2];
              if (user.categories.includes(arguments[0])) {
                self.tutorsData[arguments[0]].push(arguments[2]);
              }
            }.bind(this, arguments[0]));
          }
        }.bind(this, sub));
      }
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

  //  this.tutors = tutorsData.filter(function(text) {
//      return text.includes(this.search);
//    }.bind(this));
  }

  categorySelected(category) {
    this.navCtrl.setRoot(Category, {category:category});
  }

  userSelected(tutor) {
    console.log(tutor);
    if (tutor === this.ds.profileRecord.get('username')) {
      this.navCtrl.push(ProfilePage);
    }else {
      this.navCtrl.setRoot(UserPage, {user:tutor});
    }
  }

}
