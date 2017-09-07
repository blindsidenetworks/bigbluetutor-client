import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DsService } from '../../shared/ds.service';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [DsService]
})
export class LoginPage {
  data:any;
  constructor(public navCtrl: NavController, private ds: DsService) {

  }

  login() {
    console.log(this.data.username);
    this.ds.login({ username: this.data.username, password: this.data.password }, this.handleLogin)
  }

  handleLogin(success, data) {
    if(success) {
      this.navCtrl.setRoot(HomePage);
    }else {
      console.log(success)
    }
  }

}
