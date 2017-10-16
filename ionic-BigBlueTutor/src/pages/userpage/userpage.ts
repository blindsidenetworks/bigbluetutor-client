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
  username:any;
  user:any;
  bio;
  categories;
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams:NavParams, private ds:DsService, private pc:PopoverController) {
    this.user = navParams.get('user');
    this.username = this.user.username;
    this.categories = this.user.categories;
    this.bio = this.user.description;
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
