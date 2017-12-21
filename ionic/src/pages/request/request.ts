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
import { ViewController, NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { DsService } from '../../shared/ds.service';

import { Inbox } from '../inbox/inbox';
import { Message } from '../message/message';

@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
})
export class RequestPopover {
  categories;
  categoriesSelected;
  times;
  time;
  user;
  username;
  userpage;
  constructor( public navCtrl: NavController, public viewCtrl: ViewController, private ds: DsService, private navParams: NavParams) {
    this.categoriesSelected = {};
    this.user = navParams.data.user;
    this.username = navParams.data.username;
    this.categories = navParams.data.user.categories;
    this.userpage = navParams.data.userpage;
    this.times = [30,60,90,120];
  }

  request() {
    var categories = this.categoriesSelected;
    var selected = [];
    for (var category in categories) {
      if(categories[category]) {
        selected.push(category);
      }
    }
    if(selected.length>0 && this.time) {
      this.ds.dsInstance.rpc.make('requestMeeting', {client: this.ds.profileRecord.get('username'), contact:this.user.username, data: {categories:selected, time: this.time}}, () => {});
      this.viewCtrl.dismiss();
      this.userpage.navCtrl.setRoot(Inbox);
      this.userpage.navCtrl.push(Message, {username: this.user.username});
    }
  }

  closeModal(){
      this.viewCtrl.dismiss();
  }
}
