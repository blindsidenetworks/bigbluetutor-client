import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import { Events } from 'ionic-angular';
import { DsService } from '../../shared/ds.service';
import { RecordListenService } from '../../shared/recordlisten.service'

@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class Message {
  messages: any;
  user: any;
  input: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform, public events: Events, private ds: DsService, private ms: RecordListenService) {
    this.user = navParams.get('user');
    if (this.ds.profileRecord.get('messages')[this.user]) {
      this.messages = this.ds.profileRecord.get('messages')[this.user];
    } else {
      var tempMessages = this.ds.profileRecord.get('messages');
      tempMessages[this.user] = [];
      this.ds.profileRecord.set('messages', tempMessages);
      this.messages = this.ds.profileRecord.get('messages')[this.user];
    }
    events.subscribe('user:message', () => {
      this.messages = this.ds.profileRecord.get('messages')[this.user];
    });
    events.subscribe('user:meeting', () => {
      var url = this.ds.profileRecord.get('meeting');
      if (url !== "") {
        if (this.platform.is('ios')) {

        } else if (this.platform.is('android')) {

        } else {
          window.open(url, '_blank');
        }
      }
    })
  }

  sendMessage() {
    console.log(this.input)
    this.ds.dsInstance.rpc.make('sendMessage', {client:this.ds.profileRecord.get('username'), contact:this.user, message:this.input}, ( error, result ) => {});
    var tempMessages = this.ds.profileRecord.get('messages');
    console.log(tempMessages);
    tempMessages[this.user].push({user:this.ds.profileRecord.get('username'), message:this.input})
    this.ds.profileRecord.set('messages', tempMessages);
    this.messages = this.ds.profileRecord.get('messages')[this.user];
    this.input = ""
  }

  requestMeeting() {
    this.ds.dsInstance.rpc.make('requestMeeting', {client: this.ds.profileRecord.get('username'), contact:this.user}, () => {})
  }
}
