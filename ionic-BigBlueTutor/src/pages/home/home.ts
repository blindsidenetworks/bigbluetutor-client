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
  constructor(public navCtrl: NavController, public events: Events, private ds: DsService, private rls:RecordListenService) {
    this.categories = ds.dataRecord.get('categories');
    events.subscribe('data:tutor', () => {
      console.log("stuff happened");
      this.tutors = ds.dataRecord.get('tutors');
    });
    this.tutors = ds.dataRecord.get('tutors');
    console.log(this.tutors);
  }

  onInput(event) {
    var categoriesData = this.ds.dataRecord.get('categories');
    var tutorsData = this.ds.dataRecord.get('tutors');
    this.categories = categoriesData.filter(function(text) {
      return text.includes(this.search);
    }.bind(this));
    this.tutors = tutorsData.filter(function(text) {
      return text.includes(this.search);
    }.bind(this));
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
