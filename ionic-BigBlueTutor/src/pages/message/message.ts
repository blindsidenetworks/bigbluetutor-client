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
    this.input = "";
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

    var newMessagesCount = this.ds.profileRecord.get('newMessagesCount');
    if (!newMessagesCount) {
      newMessagesCount = {};
    }
    newMessagesCount[this.username] = 0;
    this.ds.profileRecord.set('newMessagesCount', newMessagesCount);
  }

  seeUsername(){
    //var messages = this.ds.profileRecord.get('messages')[this.username];
  }

  ionViewDidEnter() {
    var newMessages = this.ds.profileRecord.get('newMessagesCount');
    newMessages[this.username] = 0;
    this.ds.profileRecord.set('newMessagesCount', newMessages);
    this.content.scrollToBottom(100);
    this.events.subscribe('user:newMessage', () => {
      console.log('cleared new messages');
      var newMessages = this.ds.profileRecord.get('newMessagesCount');
      newMessages[this.username] = 0;
      this.ds.profileRecord.set('newMessagesCount', newMessages);
    });
    this.events.subscribe('user:message', () => {
      this.messages = this.ds.profileRecord.get('messages')[this.username].messages;
    });
    this.events.subscribe('user:meeting', () => {
      this.joinMeeting();
    })
  }

  ionViewDidLeave() {
    this.events.unsubscribe('user:newMessage');
    this.events.unsubscribe('user:meeting');
    this.events.unsubscribe('user:message');
  }

  sendMessage() {
    if(this.input != "") {
      var msg = this.input
      this.input = ""
      this.ds.dsInstance.rpc.make('sendMessage', {client:this.ds.profileRecord.get('username'), contact:this.username, message:msg}, ( error, result ) => {});
      var tempMessages = this.ds.profileRecord.get('messages');
      tempMessages[this.username].messages.push({user:this.ds.profileRecord.get('username'), message:msg});
      this.ds.profileRecord.set('messages', tempMessages);
      this.messages = this.ds.profileRecord.get('messages')[this.username].messages;
    }
    this.content.scrollToBottom(0);
    this.textInput.setFocus();
  }

  joinMeeting() {
    var url = this.ds.profileRecord.get('meeting');
    if (url && url !== "") {
      if (this.platform.is('ios')) {
        var room = this.iab.create(url, '_system');
      } else if (this.platform.is('android')) {
        var room = this.iab.create(url, '_system');
      } else {
        window.open(url, '_blank');
      }
    }
  }

  requestMeeting() {
    this.ds.dsInstance.rpc.make('requestMeeting', {client: this.ds.profileRecord.get('username'), contact:this.username}, () => {})
  }

  declineMeeting() {
    this.ds.dsInstance.rpc.make('declineMeeting', {client: this.ds.profileRecord.get('username'), contact:this.username}, () => {})
  }

  endMeeting() {
    this.ds.dsInstance.rpc.make('endMeeting', {client: this.ds.profileRecord.get('username'), contact:this.username}, () => {})
  }
}
