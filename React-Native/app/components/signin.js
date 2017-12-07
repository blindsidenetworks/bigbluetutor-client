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
      this.props.ds.login({idToken: user.idToken}, (success, data) => {
        if(success) {
          this.state.username = data.username;
          this.state.profileRecord = this.props.ds.record.getRecord('profile/'+ this.state.username);
          this.state.dataRecord = this.props.ds.record.getRecord('data');
          this.state.profileRecord.whenReady(() => {
            this.state.dataRecord.whenReady(() => {
              if (!this.state.profileRecord.get("onboardingComplete")) {
                Actions.onboard({ds: this.props.ds, username: this.state.username, profileRecord: this.state.profileRecord, dataRecord: this.state.dataRecord});
              } else {
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
