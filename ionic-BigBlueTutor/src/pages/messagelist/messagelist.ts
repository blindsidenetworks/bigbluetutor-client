import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {Message} from '../message/message';

@Component({
  selector: 'page-messagelist',
  templateUrl: 'messagelist.html'
})
export class MessageList {
  messages: Array<{sender: string, content: string}>;

  constructor(public navCtrl: NavController) {
    this.messages = [{sender: "Cody", content: "Hi"}, {sender:"Someone", content: "Hello"}, {sender: "A Person", content: "Hey"}];
  }

  viewMessage(msg)
  {
    this.navCtrl.push(Message, {msg: msg});
  }

}
