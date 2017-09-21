import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { DsService } from '../../shared/ds.service';

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
  constructor(public viewCtrl: ViewController, private ds: DsService, private navParams: NavParams) {
    this.categoriesSelected = {};
    this.user = navParams.data.user;
    this.categories = navParams.data.user.categories;
    this.times = [15,30,45,60,90,120];
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
    }
  }
}
