import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { DsService } from '../../shared/ds.service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profilepage.html',
})
export class ProfilePage {
  username:any;
  profilePicture: string;
  online: boolean;
  status: string;

  constructor(public navCtrl: NavController, private ds: DsService) {
    this.username = this.ds.profileRecord.get("username");
    this.profilePicture = this.ds.profileRecord.get("profilePic");
    this.online = false;
    this.status = "Offline";
    this.ds.dsInstance.presence.getAll([this.username], (result) =>
    {
      if (result)
      {
        this.online = result[this.username]
        this.status =  this.online ? "Online" : "Offline";
      }
    });
  }
}
