import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { DsService } from '../shared/ds.service';
import { RecordListenService } from '../shared/recordlisten.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { RequestPopover } from '../pages/request/request';
import { GooglePlus } from '@ionic-native/google-plus';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Inbox } from '../pages/inbox/inbox';
import { Message } from '../pages/message/message';
import { ProfilePage } from '../pages/profilepage/profilepage';
import { LoginPage } from '../pages/login/login';
import { UserPage } from '../pages/userpage/userpage';
import { OnboardingPage } from '../pages/onboarding/roleChoice/roleChoice';
import { TutorRegister } from '../pages/tutorRegister/tutorRegister';
import { Category } from '../pages/category/category';
import { CreateUsernamePage } from '../pages/createusername/createusername'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Inbox,
    Message,
    ProfilePage,
    LoginPage,
    UserPage,
    OnboardingPage,
    TutorRegister,
    Category,
    RequestPopover,
    CreateUsernamePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Inbox,
    OnboardingPage,
    Message,
    ProfilePage,
    LoginPage,
    UserPage,
    TutorRegister,
    Category,
    RequestPopover,
    CreateUsernamePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DsService,
    RecordListenService,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus
  ]
})
export class AppModule {}
