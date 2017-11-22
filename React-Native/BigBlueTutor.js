import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Button,
  Text,
  View
} from 'react-native';

import Home from './src/home'
import Drawer from './src/navigation'

import createDeepstream from 'deepstream.io-client-js';

import Config from 'react-native-config';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

export default class BigBlueTutor extends Component<{}> {

  componentDidMount() {
    console.log(Config)
    console.log(Config.WEB_CLIENT_ID);
    console.log(Config.SERVER_URL);
    GoogleSignin.configure({
      webClientId: Config.WEB_CLIENT_ID
    })
    .then(() => {
      GoogleSignin.signIn()
      .then((user) => {
        this.ds = createDeepstream(Config.SERVER_URL);
        this.ds.login({idToken: user.idToken}, (success, data) => {
          console.log(success);
          console.log(data);
        });
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err);
      })
      .done();
    })
  }

  render() {
    return (
      <Drawer
      />
    );
  }
}
