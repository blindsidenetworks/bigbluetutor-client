import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DsService } from '../../shared/ds.service';
import { PopoverController } from 'ionic-angular';
import { ModalController, ViewController } from 'ionic-angular';

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

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams:NavParams, private ds:DsService, private pc:PopoverController) {
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
