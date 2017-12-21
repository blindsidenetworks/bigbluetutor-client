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
import { NavController, NavParams, ModalController, ViewController, PopoverController } from 'ionic-angular';
import { DsService } from '../../shared/ds.service';

import { Inbox } from '../inbox/inbox';
import { Message } from '../message/message';
import { RequestPopover } from '../request/request';

@Component({
  selector: 'page-user',
  templateUrl: 'userpage.html',
})
export class UserPage {
  username:string;
  user:any;
  bio: string;
  categories: any;
  online: boolean;
  status: string;
  profilePicture;
  statusColour;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public viewCtrl: ViewController, public navParams:NavParams, private ds:DsService, private pc:PopoverController) {
    this.user = navParams.get('user');
    this.username = this.user.username;
    this.categories = this.user.categories;
    this.bio = this.user.description;
    this.profilePicture = this.user.profilePic;

    this.online = false;
    this.status = "Offline";

    this.ds.dsInstance.presence.getAll([this.username], (result) =>
    {
      if (result)
      {
        this.online = result[this.username]
        this.status =  this.online ? "Online" : "Offline";
        this.statusColour = this.online ? '#00aa00' : '#444';
        document.getElementById("onlineDot").style.backgroundColor = this.statusColour;
      }
    });
  }
  ionViewDidEnter() {
    this.ds.dsInstance.presence.subscribe(this.username, (online, username) => {
      console.log(username);
      console.log(online);
      this.online = online;
      this.status =  this.online ? "Online" : "Offline";
      this.statusColour = this.online ? '#00aa00' : '#444';
      document.getElementById("onlineDot").style.backgroundColor = this.statusColour;
    });
  }

  ionViewWillLeave() {
    this.ds.dsInstance.presence.unsubscribe(this.username);
  }

  star() {
    var stars = this.ds.profileRecord.get('stars');
    if (stars.indexOf(this.username)==-1) {
      stars.push(this.username);
      this.ds.profileRecord.set('stars', stars);
    }
  }

  message() {
    this.navCtrl.setRoot(Inbox);
    this.navCtrl.push(Message, {username: this.user.username});
  }

  request(myEvent) {
    let contactModal = this.modalCtrl.create(RequestPopover, {user: this.user, username: this.user.username, userpage: this});
    contactModal.present({
      ev: myEvent
    });
  }
}
