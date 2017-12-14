import { Component } from '@angular/core';
import { NavController, Events, ViewController } from 'ionic-angular';
import { DsService } from '../../shared/ds.service';
import { Message } from '../message/message';
import { RecordListenService } from '../../shared/recordlisten.service';

@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html'
})
export class Inbox {
  messages;
  messagesRecord;
  newMessagesCount;
  tutors;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private ds: DsService, public events:Events, private rls:RecordListenService) {
  }

  viewMessage(message) {
    this.navCtrl.push(Message, {username:message});
  }

  ionViewDidEnter() {
    this.messagesRecord = this.ds.profileRecord.get("messages");
    this.newMessagesCount = this.ds.profileRecord.get('newMessagesCount');
    this.messages = Object.keys(this.messagesRecord);
    this.events.subscribe('user:message', () => {
      this.messagesRecord = this.ds.profileRecord.get("messages");
      this.newMessagesCount = this.ds.profileRecord.get('newMessagesCount');
      this.messages = Object.keys(this.ds.profileRecord.get('messages'));
    });
  }

  ionViewDidLeave() {
    this.events.unsubscribe('user:message');
  }

}
