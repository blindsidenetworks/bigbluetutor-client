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
  username;
  password;
  constructor(public navCtrl: NavController, private ds: DsService) {

  }

  login() {
    console.log(this.username);
    this.ds.login({ username: this.username, password: this.password }, this.handleLogin.bind(this))
  }

  handleLogin(success, data) {
    if(success) {
      this.navCtrl.setRoot(HomePage);
    }else {
      console.log(success)
    }
  }

}
