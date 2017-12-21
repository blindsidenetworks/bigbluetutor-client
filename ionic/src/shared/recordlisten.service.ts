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
