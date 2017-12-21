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
