import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { DsService } from '../shared/ds.service';

@Component({
  selector: 'page-app',
  templateUrl: 'app.html',
})
export class app {
  username:any;
  constructor(public navCtrl: NavController, private ds: DsService) {
    this.username = this.ds.profileRecord.get("username")
  }
}
