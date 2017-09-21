import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../home/home';
import { TutorRegister } from '../../tutorRegister/tutorRegister'
import { DsService } from '../../../shared/ds.service';

var choice;

@Component({
  selector: 'page-onboarding',
  templateUrl: 'roleChoice.html',
})
export class OnboardingPage {
  constructor(public navCtrl: NavController, public navParams:NavParams, private ds: DsService) {
  }

  student() {
    var choice = 0;
    return choice;
    //this.navCtrl.setRoot(HomePage);
  }

  tutor() {
     var choice = 1;
     return choice;
    //this.navCtrl.push(TutorRegister);
  }a

  next(){
    if (choice == 0){
      this.navCtrl.setRoot(HomePage);
    }
    else if (choice == 1){
      this.navCtrl.push(TutorRegister);
    }
  }
}
