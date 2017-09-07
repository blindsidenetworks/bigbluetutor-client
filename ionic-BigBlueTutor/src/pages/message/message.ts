import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class Message {
  message: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.message = navParams.get('msg');
  }

}
