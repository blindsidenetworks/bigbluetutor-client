import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { UserPage } from '../userpage/userpage';
import { DsService } from '../../shared/ds.service';
import { RecordListenService } from '../../shared/recordlisten.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private search;
  catagories;
  users;
  constructor(public navCtrl: NavController, public events: Events, private ds: DsService, private rls: RecordListenService) {
    this.catagories = ds.dataRecord.get('catagories');
    this.users = ds.dataRecord.get('users');
    events.subscribe('data:user', () => {
      this.users = ds.dataRecord.get('users');
    })
  }

  onInput(event) {
    var catagoriesData = this.ds.dataRecord.get('catagories');
    var usersData = this.ds.dataRecord.get('users');
    this.catagories = catagoriesData.filter(function(text) {
      return text.includes(this.search)
    }.bind(this));
    this.users = usersData.filter(function(text) {
      return text.includes(this.search)
    }.bind(this));
    console.log(this.search)
  }

  catagorySelected(catagory) {
    console.log(catagory)
  }

  userSelected(user) {
    console.log(user)
    this.navCtrl.push(UserPage, {user:user})
  }

}
