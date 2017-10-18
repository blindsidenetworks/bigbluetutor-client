import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import { Events } from 'ionic-angular';
import { DsService } from '../../shared/ds.service';
import { RoleChoice } from '../onboarding/roleChoice/roleChoice'
import { HomePage } from '../home/home'
import { LoginPage } from '../login/login'
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-createusername',
  templateUrl: 'createusername.html'
})
export class CreateUsernamePage {
  username: string;
  idToken: string;
  error:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public events: Events, private ds: DsService)
  {
    this.idToken = navParams.get("idToken");
    this.username = "";
  }

  createUsername()
  {
    this.ds.login({idToken: this.idToken, username: this.username}, (success, data) =>
    {
      if(!success && data && data.googleError)
      {
        //Verifying the idToken failed, so go back to the home page
        this.goToLogin();
      }
      else if(data && data.error && !data.username)
      {
        //Creating the user failed with an error messase, so display the message
        var errorText = document.getElementById("error");
        errorText.style.visibility = "visible";
        this.error = data.error;
      }
      else if(data && !data.error && data.username)
      {
        //Creating the user succeeded
        this.ds.dsInstance.record.has("profile/"+data.username, (error, hasRecord) =>
        {
          if(error)
          {
            console.log(error);
            return;
          }
          if(hasRecord)
          {
            this.ds.getRecord("profile/" + data.username).whenReady(profileRecord =>
            {
              this.ds.profileRecord = profileRecord;
              this.ds.getRecord("data").whenReady(dataRecord =>
              {
                this.ds.dataRecord = dataRecord;
                // if(profileRecord.get("onboardingComplete"))
                  this.goToOnboarding();
                // else
                  // this.goToOnboarding();
              });
            });
          }
        });
      } //In all other cases, do nothing
    });
  }

  goToOnboarding()
  {
    this.navCtrl.setRoot(RoleChoice);
  }

  goToHome()
  {
    this.navCtrl.setRoot(TabsPage);
  }

  goToLogin()
  {
    this.navCtrl.setRoot(LoginPage);
  }

  hideError()
  {
    var errorText = document.getElementById("error");
    errorText.style.visibility = "hidden";
  }
}
