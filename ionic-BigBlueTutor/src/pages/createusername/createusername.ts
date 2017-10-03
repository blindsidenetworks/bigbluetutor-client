import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import { Events } from 'ionic-angular';
import { DsService } from '../../shared/ds.service';
import { OnboardingPage } from '../onboarding/roleChoice/roleChoice'
import { HomePage } from '../home/home'

@Component({
  selector: 'page-createusername',
  templateUrl: 'createusername.html'
})
export class CreateUsernamePage {
  username: string;
  googleID: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public events: Events, private ds: DsService)
  {
    this.googleID = navParams.get("googleID");
  }

  createUsername()
  {
    this.ds.dsInstance.rpc.make("createUser", {googleID: this.googleID, username: this.username}, (error, result) =>
    {
      if(error)
      {
        console.log(error);
      }
      else if(result && result.error && !result.success)
      {
        var errorText = document.getElementById("error");
        errorText.innerHTML = result.error;
        errorText.style.visibility = "visible";
      }
      else if(result && result.success)
      {
        this.ds.dsInstance.record.has("googleID/"+this.googleID, (error, hasRecord) =>
        {
          if(error)
          {
            console.log(error);
            return;
          }
          if(hasRecord)
          {
            this.ds.getRecord("googleID/"+this.googleID).whenReady(googleRecord =>
            {
                var user = googleRecord.get();
                if(user && user.username && user.googleID)
                {
                  this.ds.getRecord(googleRecord.get("username")).whenReady(profileRecord =>
                  {
                    this.ds.profileRecord = profileRecord;
                    this.ds.getRecord("data").whenReady(dataRecord =>
                    {
                      this.ds.dataRecord = dataRecord;
                      if(!profileRecord.get("onboardingComplete"))
                        this.goToOnboarding();
                      else
                        this.goToHome();
                    });
                  });
                }
            });
          }
        });
      }
      /*
      var record = this.ds.getRecord("googleID/"+this.googleID);
      record.set({
        username: this.username,
        password: '',
        stars: [],
        pendingMeetings: [],
        requestMeetings: [],
        messages: {},
        profilePic: "http://www.freeiconspng.com/uploads/msn-people-person-profile-user-icon--icon-search-engine-16.png",
        meeting: ""
      });
      this.ds.profileRecord = record;
      this.ds.dataRecord = this.ds.getRecord("data")
      this.ds.dataRecord.whenReady(() => {
        this.goToOnboarding();
      })
      */
    });
  }

  goToOnboarding()
  {
    this.navCtrl.setRoot(OnboardingPage);
  }

  goToHome()
  {
    this.navCtrl.setRoot(HomePage);
  }

  hideError()
  {
    var errorText = document.getElementById("error");
    errorText.style.visibility = "hidden";
  }
}
