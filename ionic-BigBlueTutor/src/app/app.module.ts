import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import {MessageList} from '../pages/messagelist/messagelist';
import {Message} from '../pages/message/message'
import { DsService } from '../shared/ds.service'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MessageList,
    Message
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MessageList,
    Message
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
