import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { DsService } from '../../shared/ds.service';

import { Inbox } from '../inbox/inbox';
import { Message } from '../message/message';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  usernames;
  constructor( public navCtrl: NavController, public viewCtrl: ViewController, private ds: DsService, private navParams: NavParams) {

  }
}
