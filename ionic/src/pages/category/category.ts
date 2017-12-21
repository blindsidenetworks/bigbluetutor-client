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
  type;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform, public events: Events, private ds: DsService) {
    this.category = navParams.get('category');
    this.type = "category";
    if (Object.keys(this.ds.dataRecord.get('categories')).indexOf(this.category) != -1) {
      this.type = "subject";
    }

    ds.dsInstance.rpc.make(this.type+'/tutor', {subject: this.category}, function(error, data) {
      if (error) throw error
      this.tutors = data.data;
    }.bind(this));

  }

  userSelected(tutor) {
    //console.log(tutor);
    if (tutor.username === this.ds.profileRecord.get('username')) {
      this.navCtrl.push(ProfilePage);
    }else {
      this.navCtrl.push(UserPage, {user:tutor});
    }
  }

  ionViewWillEnter() {
    this.ds.dsInstance.event.subscribe(this.type+'/tutor/'+this.category, function(data) {
      this.tutors = data.data;
    }.bind(this));
  }

  ionViewDidLeave() {
      this.ds.dsInstance.event.unsubscribe(this.type+'/tutor/'+this.category);
  }

}
