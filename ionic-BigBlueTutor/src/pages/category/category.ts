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
    var type = "category";
    if (Object.keys(this.ds.dataRecord.get('categories')).indexOf(this.category) != -1) {
      type = "subject";
    }

    ds.dsInstance.rpc.make(type+'/tutor', {subject: this.category}, function(error, data) {
      if (error) throw error
      this.tutors = data.data;
    }.bind(this));

    ds.dsInstance.event.subscribe(type+'/tutor/'+this.category, function(data) {
      this.tutors = data.data;
    }.bind(this));
  }

  userSelected(tutor) {
    //console.log(tutor);
    if (tutor === this.ds.profileRecord.get('username')) {
      this.navCtrl.setRoot(ProfilePage);
    }else {
      this.navCtrl.push(UserPage, {user:tutor});
    }
  }

}
