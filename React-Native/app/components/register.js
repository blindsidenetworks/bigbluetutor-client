import React, { Component } from 'react';
import {
  Button,
  Modal,
  TextInput,
  TouchableHighlight,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Config from 'react-native-config';
import PushNotification from 'react-native-push-notification';

styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#3F89E2'
  }
})

export default class Register extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true
    }
  }

  setModalVisible(visible) {
    this.state.modalVisible = visible;
  }

  register() {
    this.props.ds.login({idToken: this.props.idToken, username: this.state.username, platform: Platform.OS}, (success,data) => {
      if(success) {
        this.state.username = data.username;
        this.state.profileRecord = this.props.ds.record.getRecord('profile/'+ this.state.username);
        this.state.dataRecord = this.props.ds.record.getRecord('data');
        this.state.profileRecord.whenReady(() => {
          this.state.dataRecord.whenReady(() => {
            if (!this.state.profileRecord.get("onboardingComplete")) {
              Actions.reset('onboard', {ds: this.props.ds, username: this.state.username, profileRecord: this.state.profileRecord, dataRecord: this.state.dataRecord});
            } else {
              this.configurePush();
              Actions.reset('drawer', {ds: this.props.ds, username: this.state.username, profileRecord: this.state.profileRecord, dataRecord: this.state.dataRecord});
              Actions.home({ds: this.props.ds, username: this.state.username, profileRecord: this.state.profileRecord, dataRecord: this.state.dataRecord});
            }
          })
        })
      }
    })
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
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {Actions.pop()}}
          >
         <View style={ styles.container } >
          <View>
            <View
              style={{ marginLeft: 20 }}
            >
              <Text>Please Enter a username</Text>
            </View>
            <TextInput
              underlineColorAndroid='transparent'
              style={{ marginHorizontal: 20, backgroundColor: '#27d' }}
              onChangeText={(text) => this.state.username=text}
              value={this.state.username}
            />
            <View
              style={{flexDirection: 'row', justifyContent:'center'}}
            >
              <TouchableOpacity
                onPress={this.register.bind(this)}
              >
                <Text
                  style={{ fontSize: 30, color: '#fff'}}
                >
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
         </View>
        </Modal>
    );
  }
}
