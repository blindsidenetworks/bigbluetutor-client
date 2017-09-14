import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DsService } from '../../shared/ds.service';

import { Inbox } from '../inbox/inbox';
import { Message } from '../message/message';

@Component({
  selector: 'page-user',
  templateUrl: 'userpage.html',
})
export class UserPage {
  username:any;
  user:any;
  constructor(public navCtrl: NavController, public navParams:NavParams) {
    this.user = navParams.get('user');
    this.username = this.user.username;
  }

  star() {
    console.log("do star here");
  }

  message() {
    this.navCtrl.setRoot(Inbox);
    this.navCtrl.push(Message, {username: this.user.username});
  }

}
