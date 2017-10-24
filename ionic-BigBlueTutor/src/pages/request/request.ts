import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { DsService } from '../../shared/ds.service';

import { Inbox } from '../inbox/inbox';
import { Message } from '../message/message';

@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
})
export class RequestPopover {
  categories;
  categoriesSelected;
  times;
  time;
  user;
  username;
  userpage;
  constructor( public navCtrl: NavController, public viewCtrl: ViewController, private ds: DsService, private navParams: NavParams) {
    this.categoriesSelected = {};
    this.user = navParams.data.user;
    this.username = navParams.data.username;
    this.categories = navParams.data.user.categories;
    this.userpage = navParams.data.userpage;
    this.times = [30,60,90,120];
  }

  request() {
    var categories = this.categoriesSelected;
    var selected = [];
    for (var category in categories) {
      if(categories[category]) {
        selected.push(categories[category]);
      }
    }
    if(selected.length>0 && this.time) {
      this.ds.dsInstance.rpc.make('requestMeeting', {client: this.ds.profileRecord.get('username'), contact:this.user.username, data: {categories:selected}}, () => {});
      this.viewCtrl.dismiss();
      this.userpage.navCtrl.setRoot(Inbox);
      this.userpage.navCtrl.push(Message, {username: this.user.username});
    }
  }

  closeModal(){
      this.viewCtrl.dismiss();
  }
}
