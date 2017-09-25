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
      var subCategories = categoryData[category];
      for (var i =0;i<subCategories.length;i++) {
        this.categories.push(subCategories[i]);
        ds.dsInstance.event.subscribe('search/'+subCategories[i], function(data) {
          this.tutorsData[data.subject.split('/')[1]] = data.data;
          this.tutors[data.subject.split('/')[1]] = data.data;
          /*var tutors = data.data;
          this.tutorsData[data.subject.split('/')[1]] = []
          for (var tutor in tutors) {
            this.ds.dsInstance.record.snapshot('user/'+tutors[tutor], function(error,data) {
              this.tutorsData[data.subject.split('/')[1]].push(data);
            })
          }*/
          //this.tutors = this.tutorsData[data.subject.split('/')[1]];
        }.bind(this))
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

//    this.tutors = tutorsData.filter(function(text) {
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
