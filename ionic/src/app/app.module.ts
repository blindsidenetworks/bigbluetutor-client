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
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AppPreferences } from '@ionic-native/app-preferences';
import { Push } from '@ionic-native/push';

import { DsService } from '../shared/ds.service';
import { PushService } from '../shared/push.service';
import { OAuthService } from '../shared/oauth.service';
import { RecordListenService } from '../shared/recordlisten.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { RequestPopover } from '../pages/request/request';
import { GooglePlus } from '@ionic-native/google-plus';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Inbox } from '../pages/inbox/inbox';
import { Message } from '../pages/message/message';
import { ProfilePage } from '../pages/profilepage/profilepage';
import { LoginPage } from '../pages/login/login';
import { UserPage } from '../pages/userpage/userpage';
import { RoleChoice } from '../pages/onboarding/roleChoice/roleChoice';
import { TutorRegister } from '../pages/onboarding/tutorRegister/tutorRegister';
import { Category } from '../pages/category/category';
import { CreateUsernamePage } from '../pages/createusername/createusername';
import { PreOnboarding } from '../pages/preOnboarding/preOnboarding';
import { OnboardingPage } from '../pages/onboarding/onboarding/onboarding';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Inbox,
    RoleChoice,
    OnboardingPage,
    Message,
    ProfilePage,
    LoginPage,
    UserPage,
    TutorRegister,
    Category,
    RequestPopover,
    CreateUsernamePage,
    PreOnboarding,
    OnboardingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Inbox,
    RoleChoice,
    OnboardingPage,
    Message,
    ProfilePage,
    LoginPage,
    UserPage,
    TutorRegister,
    Category,
    RequestPopover,
    CreateUsernamePage,
    PreOnboarding,
    OnboardingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppPreferences,
    OAuthService,
    DsService,
    RecordListenService,
    PushService,
    InAppBrowser,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus,
  ]
})
export class AppModule {}
