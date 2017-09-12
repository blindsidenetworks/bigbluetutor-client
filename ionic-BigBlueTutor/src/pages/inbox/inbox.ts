import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { DsService } from '../../shared/ds.service';
import {Message} from '../message/message';

@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html'
})
export class Inbox {
  messages;

  constructor(public navCtrl: NavController, private ds: DsService) {
    console.log(Object.keys(this.ds.profileRecord.get("messages")))
    this.messages = Object.keys(this.ds.profileRecord.get("messages"));
  }

  viewMessage(message)
  {
    this.navCtrl.push(Message, {username:message});
  }

}
