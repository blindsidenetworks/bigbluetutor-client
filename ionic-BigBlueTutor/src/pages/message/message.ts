import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Platform, Events, Content, TextInput} from 'ionic-angular';
import { DsService } from '../../shared/ds.service';
import { RecordListenService } from '../../shared/recordlisten.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class Message {
  messages: any;
  username: any;
  input: any;
  @ViewChild('content') content: Content;
  @ViewChild('textInput') textInput;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform, public events: Events, private ds: DsService, private rls:RecordListenService, private iab: InAppBrowser) {
    this.username = navParams.get('username');
    if (this.ds.profileRecord.get('messages') && this.ds.profileRecord.get('messages')[this.username]) {
      this.messages = this.ds.profileRecord.get('messages')[this.username].messages;
    } else {
      var userRecord = this.ds.dsInstance.record.getRecord('user/'+this.username);
      userRecord.whenReady(() => {
        var tempMessages = this.ds.profileRecord.get('messages');
        tempMessages[this.username] = {pic: userRecord.get('profilePic'),messages:[]};
        this.ds.profileRecord.set('messages', tempMessages);
        this.messages = this.ds.profileRecord.get('messages')[this.username].messages;
      })
    }
    events.subscribe('user:message', () => {
      this.messages = this.ds.profileRecord.get('messages')[this.username].messages;
    });
    events.subscribe('user:meeting', () => {
      var url = this.ds.profileRecord.get('meeting');
      if (url !== "") {
        if (this.platform.is('ios')) {
          var room = iab.create(url, '_system');
        } else if (this.platform.is('android')) {
          var room = iab.create(url, '_system');
        } else {
          window.open(url, '_blank');
        }
      }
    })
  }

  ionViewDidEnter() {
    this.content.scrollToBottom(0);
  }

  sendMessage() {
    //console.log(this.input)
    if(this.input != "") {
      this.ds.dsInstance.rpc.make('sendMessage', {client:this.ds.profileRecord.get('username'), contact:this.username, message:this.input}, ( error, result ) => {});
      var tempMessages = this.ds.profileRecord.get('messages');
      //console.log(tempMessages);
      tempMessages[this.username].push({user:this.ds.profileRecord.get('username'), message:this.input})
      this.ds.profileRecord.set('messages', tempMessages);
      this.messages = this.ds.profileRecord.get('messages')[this.username];
      this.input = ""
    }
      this.textInput.setFocus();
    //this.content.scrollToBottom(100);
  }

  requestMeeting() {
    this.ds.dsInstance.rpc.make('requestMeeting', {client: this.ds.profileRecord.get('username'), contact:this.username}, () => {})
  }

  declineMeeting() {
    this.ds.dsInstance.rpc.make('declineMeeting', {client: this.ds.profileRecord.get('username'), contact:this.username}, () => {})
  }
}
