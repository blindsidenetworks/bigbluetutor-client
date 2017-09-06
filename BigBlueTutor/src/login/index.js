import deepstream from 'deepstream.io-client-js'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  Button,
  NativeModules,
  KeyboardAvoidingView,
  View
} from 'react-native';
import styles from "./styles"
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', login: NativeModules.Login };
  }
  _register() {
    /*fetch('https://tutor-back.blindside-dev.com:3000/api/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'auth': {
          'username': this.state.username,
          'password': this.state.password,
        }
      })
    })
    .then((response) => {
      console.log(response)
      if (response._bodyText == "USER REGISTERED") {
        NativeModules.LoginViewController.login(this.state.username, this.state.password);
      }
    })
    .catch((error) => {
      console.log(error)
      console.error(error)
    });*/
  }
  _login() {
    NativeModules.LoginViewController.login(this.state.username, this.state.password);
    /*var client = deepstream('ws://tutor-back.blindside-dev.com:6020')
    client.login({
      username: this.state.username,
      password: this.state.password
    })*/
    /*fetch('https://tutor-back.blindside-dev.com:3000/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'auth': {
          'username': this.state.username,
          'password': this.state.password,
        }
      })
    })
    .then((response) => {
      console.log(response)
      if (response._bodyText == 'SUCCESS') {
        NativeModules.LoginViewController.login(this.state.username, this.state.password);
      }
    })
    .catch((error) => {
      console.error(error);
    });*/
  }
  render() {
    return(
      <KeyboardAvoidingView
        style= { styles.form }
        behavior="padding"
      >
        <View style= { styles.fieldContainer }>
          <TextInput
            style= { styles.input }
            placeholder= 'username'
            onChangeText={ (text) => { this.setState({username: text })} }
            value= { this.state.username}
            />
        </View>
        <View style= { styles.fieldContainer }>
          <TextInput
            style= { styles.input }
            placeholder= 'password'
            onChangeText={ (text) => { this.setState({password: text })}  }
            value= { this.state.password }
          />
        </View>
        <View style={{ alignSelf: 'stretch' }}>
          <View style= { styles.buttonContainer }>
            <Button
              onPress = { this._register.bind(this) }
              title= "Register"
              color= "#d22"
              />
            <Button
              onPress = { this._login.bind(this) }
              title= "Login"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
export { Login };
