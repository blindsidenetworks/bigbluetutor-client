import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { DsService } from './ds.service';

@Injectable()
export class RecordListenService {

  constructor(public events: Events, private ds: DsService) {
    this.ds.profileRecord.subscribe('messages',() => {
      events.publish('user:message');
    })
    this.ds.profileRecord.subscribe('meeting', () => {
      events.publish('user:meeting');
    })
    this.ds.profileRecord.subscribe('newMessagesCount', () => {
      events.publish('user:newMessage');
    })
    this.ds.dataRecord.subscribe('tutors', () => {
      events.publish('data:tutor');
    })
  }
}
