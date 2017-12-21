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
import { NavController, ViewController, Events } from 'ionic-angular';
import { DsService } from '../../shared/ds.service';
import { RecordListenService } from '../../shared/recordlisten.service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profilepage.html',
})
export class ProfilePage {
  username:any;
  user:any;
  profilePicture: string;
  bio: string;
  online: boolean;
  statusColour;
  status: string;
  hasNewMessage;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private ds: DsService, public events:Events, private rls:RecordListenService) {
    this.username = this.ds.profileRecord.get("username");
    this.user = this.ds.getRecord("user/"+this.username);
    this.user.whenReady(record => {
      this.profilePicture = this.user.get('profilePic');
      this.bio = record.get("description");
    })

    this.online = false;
    this.status = "Offline";
    this.ds.dsInstance.presence.getAll([this.username], (result) => {
      if (result) {
        this.online = result[this.username]
        this.status =  this.online ? "Online" : "Offline";
        this.statusColour = this.online ? '#00aa00' : '#444';
        document.getElementById("onlineDot").style.backgroundColor = this.statusColour;
      }
    });

    var newMessages = this.ds.profileRecord.get('newMessagesCount');
    for (var message in newMessages) {
      if(newMessages[message]) {
        this.hasNewMessage = true;
        break;
      }
    }
  }

  ionViewDidEnter() {
    this.events.subscribe('user:newMessage', () => {
      this.hasNewMessage = true;
    });
  }

  ionViewDidLeave() {
    this.events.unsubscribe('user:newMessage');
  }
}
