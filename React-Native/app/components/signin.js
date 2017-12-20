import React, { Component } from 'react';
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import createDeepstream from 'deepstream.io-client-js';
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
    this.state.ds = createDeepstream(Config.SERVER_URL);
    this.state.ds.on('error', (error, event, topic ) => {
      console.log(error, event, topic);
      Actions.reset('signin', {ds: this.state.ds, configurePush: this.props.configurePush})
    })
    GoogleSignin.configure({
      iosClientId: Config.IOS_CLIENT_ID,
      webClientId: Config.WEB_CLIENT_ID
    })
    GoogleSignin.signIn()
    .then((user) => {
      this.state.ds.login({idToken: user.idToken, platform: Platform.OS}, (success, data) => {
        if(success) {
          this.state.username = data.username;
          this.state.profileRecord = this.props.ds.record.getRecord('profile/'+ this.state.username);
          this.state.dataRecord = this.props.ds.record.getRecord('data');
          this.state.profileRecord.whenReady(() => {
            this.state.dataRecord.whenReady(() => {
              if (!this.state.profileRecord.get("onboardingComplete")) {
                Actions.onboard({ds: this.props.ds, username: this.state.username, profileRecord: this.state.profileRecord, dataRecord: this.state.dataRecord, configurePush: this.props.configurePush});
              } else {
                var configurePush = this.props.configurePush.bind(this)
                configurePush()
                Actions.reset('drawer', {ds: this.props.ds, username: this.state.username, profileRecord: this.state.profileRecord, dataRecord: this.state.dataRecord, configurePush: this.props.configurePush});
                Actions.home({ds: this.props.ds, username: this.state.username, profileRecord: this.state.profileRecord, dataRecord: this.state.dataRecord, configurePush: this.props.configurePush});
              }
            })
          })
        } else {
          if(data.needsUsername) {
            Actions.register({ds: this.props.ds, idToken: user.idToken, configurePush: this.props.configurePush});
          }
        }
      });
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
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
