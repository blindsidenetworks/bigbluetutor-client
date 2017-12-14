import React, { Component } from 'react';
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import Config from 'react-native-config';
import {Actions} from 'react-native-router-flux';
import PushNotification from 'react-native-push-notification';

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3F89E2'
  },
  buttonContainer: {
    flex:1,
    flexDirection:'row',
    justifyContent: 'center'
  },
})

export default class SignIn extends Component<{}> {

  constructor(props) {
    super(props)
    this.state = {}
  }

  signIn() {
    GoogleSignin.configure({
      iosClientId: Config.IOS_CLIENT_ID,
      webClientId: Config.WEB_CLIENT_ID
    })
    GoogleSignin.signIn()
    .then((user) => {
      this.props.ds.login({idToken: user.idToken, platform: Platform.OS}, (success, data) => {
        if(success) {
          this.state.username = data.username;
          this.state.profileRecord = this.props.ds.record.getRecord('profile/'+ this.state.username);
          this.state.dataRecord = this.props.ds.record.getRecord('data');
          this.state.profileRecord.whenReady(() => {
            this.state.dataRecord.whenReady(() => {
              if (!this.state.profileRecord.get("onboardingComplete")) {
                Actions.onboard({ds: this.props.ds, username: this.state.username, profileRecord: this.state.profileRecord, dataRecord: this.state.dataRecord});
              } else {
                this.configurePush()
                Actions.reset('drawer', {ds: this.props.ds, username: this.state.username, profileRecord: this.state.profileRecord, dataRecord: this.state.dataRecord});
                Actions.home({ds: this.props.ds, username: this.state.username, profileRecord: this.state.profileRecord, dataRecord: this.state.dataRecord});
              }
            })
          })
        } else {
          if(data.needsUsername) {
            Actions.register({ds: this.props.ds, idToken: user.idToken});
          }
        }
      });
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  configurePush() {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        console.log( 'TOKEN:', token );
        this.props.ds.rpc.make('addDeviceToken', { username: this.props.profileRecord.get('username'), deviceToken: token.token, version: 'react-native', platform: 'android' }, () => {});
      }.bind(this),

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
        PushNotification.localNotification({
          largeIcon: notification.notification.icon, // (optional) default: "ic_launcher"
          smallIcon: notification.notification.icon, // (optional) default: "ic_notification" with fallback for "ic_launcher"
          bigText: notification.notification.body, // (optional) default: "message" prop
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
          title: notification.notification.title, // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
          message: notification.notification.body, // (required)
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

      popInitialNotification: true,

      requestPermissions: true,
    });
  }

  render() {
    return (
      <View
        style={styles.container}
      >
          <GoogleSigninButton
            style={{width: 120, height: 44}}
            color={GoogleSigninButton.Color.Light}
            size={GoogleSigninButton.Size.Icon}
            onPress={() => {this.signIn();}}
          />
      </View>
    );
  }
}
