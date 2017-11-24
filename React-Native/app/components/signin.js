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

export default class SignIn extends Component<{}> {

  signIn() {
    GoogleSignin.configure({
      webClientId: Config.WEB_CLIENT_ID
    })
    GoogleSignin.signIn()
    .then((user) => {
      this.props.ds.login({idToken: user.idToken}, (success, data) => {
        if(success) {
          Actions.home({ds: this.props.ds});
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

  render() {
    return (
      <View>
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
