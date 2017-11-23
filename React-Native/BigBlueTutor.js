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

import HomePage from './src/core/home';
import InboxPage from './src/core/inbox';
import Menu from './src/core/menu';
import Register from './src/register/register';
import SignIn from './src/register/signin'

import createDeepstream from 'deepstream.io-client-js';
import Config from 'react-native-config';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

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
        webClientId: Config.WEB_CLIENT_ID
      })
      .then(() => {
        GoogleSignin.signIn()
        .then((user) => {
          this.state.ds.login({idToken: user.idToken}, (success, data) => {
            console.log(success);
            console.log(data);
            if(success) {
              Actions.home({ds: this.state.ds});
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

  render() {
    return (
      <Router hideNavBar>
        <Scene key="root" hideNavBar>
          <Scene key="signin" component={SignIn} ds={this.state.ds} hideNavBar/>
          <Modal key="register" component={Register} hideNavBar/>
          <Drawer key="drawer" contentComponent={Menu} hideNavBar>
            <Scene key="home" component={HomePage} hideNavBar/>
            <Scene key="inbox" component={InboxPage} hideNavBar/>
          </Drawer>
        </Scene>
      </Router>
    );
  }
}
