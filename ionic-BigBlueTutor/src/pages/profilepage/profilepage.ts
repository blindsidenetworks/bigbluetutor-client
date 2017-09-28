import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { DsService } from '../../shared/ds.service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profilepage.html',
})
export class ProfilePage {
  username:any;
  user;
  constructor(public navCtrl: NavController, private ds: DsService) {
    console.log(ds)
    this.username = this.ds.profileRecord.get("username");
    this.user = this.ds.getRecord('user/'+this.username);
  }
}
