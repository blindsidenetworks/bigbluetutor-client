import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Button,
  Text,
  View
} from 'react-native';

import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from 'react-native-router-flux';

import HomePage from './components/home';
import InboxPage from './components/inbox';
import Menu from './components/menu';
import MessagesPage from './components/messages';
import Onboard from './components/onboard';
import ProfilePage from './components/profile'
import Register from './components/register';
import SearchPage from './components/search';
import SignIn from './components/signin'

import createDeepstream from 'deepstream.io-client-js';
import Config from 'react-native-config';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import PushNotification from 'react-native-push-notification';

export default class BigBlueTutor extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      signinVisible: false,
      loginVisible: false
    };
  }

  componentWillMount() {
    this.state.ds = createDeepstream(Config.SERVER_URL);
  }

  componentDidMount() {

    if(this.state.ds.getConnectionState() != "OPEN") {
      GoogleSignin.configure({
        iosClientId: Config.IOS_CLIENT_ID,
        webClientId: Config.WEB_CLIENT_ID
      })
      .then(() => {
        GoogleSignin.signIn()
        .then((user) => {
          this.state.ds.login({idToken: user.idToken, platform: Platform.OS}, (success, data) => {
            if(success) {
              this.state.username = data.username;
              this.state.profileRecord = this.state.ds.record.getRecord('profile/'+ this.state.username);
              this.state.dataRecord = this.state.ds.record.getRecord('data');
              this.state.profileRecord.whenReady(() => {
                this.state.dataRecord.whenReady(() => {
                  if (!this.state.profileRecord.get("onboardingComplete")) {
                    Actions.onboard({ds: this.state.ds, username: this.state.username, profileRecord: this.state.profileRecord, dataRecord: this.state.dataRecord});
                  } else {
                    this.configurePush();
                    Actions.reset('drawer', {ds: this.state.ds, username: this.state.username, profileRecord: this.state.profileRecord, dataRecord: this.state.dataRecord});
                    Actions.home({ds: this.state.ds, username: this.state.username, profileRecord: this.state.profileRecord, dataRecord: this.state.dataRecord});
                  }
                })
              })
            } else {
              if(data.needsUsername) {
                Actions.register({ds: this.state.ds, idToken: user.idToken});
              } else {
                Actions.signin({ds: this.state.ds})
              }
            }
          });
        })
        .catch((err) => {
          console.log('WRONG SIGNIN', err);
        })
        .done();
      })
    }
  }

  configurePush() {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        console.log( 'TOKEN:', token );
        this.state.ds.rpc.make('addDeviceToken', { username: this.state.profileRecord.get('username'), deviceToken: token.token }, () => {});
      }.bind(this),

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
        PushNotification.localNotification({
          largeIcon: notification.icon, // (optional) default: "ic_launcher"
          smallIcon: notification.icon, // (optional) default: "ic_notification" with fallback for "ic_launcher"
          bigText: notification.message, // (optional) default: "message" prop
          color: "blue", // (optional) default: system default
          vibrate: true, // (optional) default: true
          vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
          tag: 'some_tag', // (optional) add tag to message
          group: "group", // (optional) add group to message
          ongoing: false, // (optional) set whether this is an "ongoing" notification

          /* iOS only properties
          alertAction: // (optional) default: view
          category: // (optional) default: null
          userInfo: // (optional) default: null (object containing additional notification data)
          */

          /* iOS and Android properties */
          title: notification.title, // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
          message: notification.message, // (required)
          playSound: false, // (optional) default: true
          soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        })
      },

      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: Config.SENDER_ID,

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
          alert: true,
          badge: true,
          sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

        /*
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */

      requestPermissions: true,
    });
  }

  render() {
    return (
      <Router hideNavBar>
        <Scene key="root" hideNavBar>
          <Scene key="signin" component={ SignIn } ds={ this.state.ds } hideNavBar/>
          <Modal key="onboard" component={ Onboard } hideNavBar/>
          <Modal key="register" component={ Register } hideNavBar/>
          <Drawer key="drawer" contentComponent={ Menu } ds={ this.state.ds } drawerWidth={200} hideNavBar>
            <Scene key="home" component={ HomePage } hideNavBar/>
            <Scene key="inbox" component={ InboxPage } hideNavBar/>
            <Scene key="messages" component={ MessagesPage } hideNavBar/>
            <Scene key="profile" component={ ProfilePage } hideNavBar/>
            <Scene key="search" component={ SearchPage } hideNavBar/>
          </Drawer>
        </Scene>
      </Router>
    );
  }
}
