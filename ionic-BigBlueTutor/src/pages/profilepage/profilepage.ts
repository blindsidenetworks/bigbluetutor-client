import { Component } from '@angular/core';
import { NavController, ViewController, Events } from 'ionic-angular';
import { DsService } from '../../shared/ds.service';
import { RecordListenService } from '../../shared/recordlisten.service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profilepage.html',
})
export class ProfilePage {
  username:any;
  user:any;
  profilePicture: string;
  bio: string;
  online: boolean;
  statusColour;
  status: string;
  hasNewMessage;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private ds: DsService, public events:Events, private rls:RecordListenService) {
    this.username = this.ds.profileRecord.get("username");
    this.user = this.ds.getRecord("user/"+this.username);
    this.user.whenReady(record => {
      this.profilePicture = this.user.get('profilePic');
      this.bio = record.get("description");
    })

    this.online = false;
    this.status = "Offline";
    this.ds.dsInstance.presence.getAll([this.username], (result) => {
      if (result) {
        this.online = result[this.username]
        this.status =  this.online ? "Online" : "Offline";
        this.statusColour = this.online ? '#00aa00' : '#444';
        document.getElementById("onlineDot").style.backgroundColor = this.statusColour;
      }
    });

    var newMessages = this.ds.profileRecord.get('newMessagesCount');
    for (var message in newMessages) {
      if(newMessages[message]) {
        this.hasNewMessage = true;
        break;
      }
    }
  }

  ionViewDidEnter() {
    this.events.subscribe('user:newMessage', () => {
      this.hasNewMessage = true;
    });
  }

  ionViewDidLeave() {
    this.events.unsubscribe('user:newMessage');
  }
}
