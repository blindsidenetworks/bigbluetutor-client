import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
//import * as deepstream from 'deepstream.io-client-js';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {

  }

  login() {
    /*var client = deepstream("https://tutor-back.blindside-dev.com:6020").login({ username: "", password: "" })
    @injectable() export class DsService ( get dsInstance() { return client })*/
    this.navCtrl.setRoot(HomePage);
  }

}
