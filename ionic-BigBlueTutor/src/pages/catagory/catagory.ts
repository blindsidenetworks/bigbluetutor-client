import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import { Events } from 'ionic-angular';
import { DsService } from '../../shared/ds.service';
import { RecordListenService } from '../../shared/recordlisten.service'

@Component({
  selector: 'page-catagory',
  templateUrl: 'catagory.html'
})
export class Catagory {
  catagory: any;
  users;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform, public events: Events, private ds: DsService) {
    this.catagory = navParams.get('catagory');
    this.users = ds.dataRecord.get('users');

    events.subscribe('user:message', () => {
    });
    events.subscribe('user:meeting', () => {
    });
  }

  register() {
    this.ds
  }
}
