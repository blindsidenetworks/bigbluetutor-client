import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { DsService } from '../../shared/ds.service';

@Component({
  template: `
    <ion-list>
      <ion-list-header>I need help in:</ion-list-header>
      <ion-item *ngFor="let category of categories">
        <ion-label>{{ category }}</ion-label>
        <ion-checkbox [(ngModel)]="categoriesSelected[category]"></ion-checkbox>
      </ion-item>
    </ion-list>
    <ion-list>
      <ion-item *ngFor="let time of times">
        <ion-label>{{ time }}</ion-label>
        <ion-radio>
        </ion-radio>
      </ion-item>
    </ion-list>
    <button (click)="request" ion-button>
      Request Meeting
    </button>
`
})
export class RequestPopover {
  categories;
  categoriesSelected;
  times;
  user;
  constructor(public viewCtrl: ViewController, private ds: DsService, private navParams: NavParams) {
    this.categoriesSelected = {};
    this.user = navParams.data.user;
    this.categories = navParams.data.user.categories;
    this.times = [15,30,45,60,90,120];
  }

  close() {
    this.viewCtrl.dismiss();
  }

  request() {
    this.ds.dsInstance.rpc.make('requestMeeting', {client: this.ds.profileRecord.get('username'), contact:this.user.username}, () => {});
  }
}
