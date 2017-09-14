import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ProfilePage } from '../profilepage/profilepage';
import { UserPage } from '../userpage/userpage';
import { DsService } from '../../shared/ds.service';
import { RecordListenService } from '../../shared/recordlisten.service'

@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class Category {
  category: any;
  tutors;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform, public events: Events, private ds: DsService) {
    this.category = navParams.get('category');
    var tutors = ds.dataRecord.get('tutors');
    this.tutors = [];
    for (var i in tutors) {
      if (tutors[i].categories.indexOf(this.category) != -1) {
        this.tutors.push(tutors[i]);
      }
    }
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
