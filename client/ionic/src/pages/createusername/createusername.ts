/*
BigBlueButton open source conferencing system - http://www.bigbluebutton.org/

Copyright (c) 2017 BigBlueButton Inc. and by respective authors (see below).

This file is part of BigBlueTutor.

BigBlueTutor is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

BigBlueTutor is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with BigBlueTutor.  If not, see <http://www.gnu.org/licenses/>.
*/
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { DsService } from '../../shared/ds.service';
import { RoleChoice } from '../onboarding/roleChoice/roleChoice';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

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
                if(profileRecord.get("onboardingComplete"))
                  this.goToHome();
                else
                  this.goToOnboarding();
              });
            });
          }
        });
      } //In all other cases, do nothing
    });
  }

  goToHome()
  {
    this.navCtrl.setRoot(HomePage);
  }

  goToOnboarding()
  {
    this.navCtrl.setRoot(RoleChoice);
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
