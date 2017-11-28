import React, { Component } from 'react';
import {
  Button,
  Modal,
  TextInput,
  TouchableHighlight,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';

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

  render() {
    return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {Actions.pop()}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Text>Please Enter a username</Text>
            <TextInput
              onChangeText={(text) => this.state.username=text}
              value={this.state.username}
            />
            <Button
              onPress={() => {
                this.props.ds.login({idToken: this.props.idToken, username: this.state.username}, (success,data) => {
                  if(success) {
                    this.state.username = data.username;
                    this.state.profileRecord = this.props.ds.record.getRecord('profile/'+ this.state.username);
                    this.state.dataRecord = this.props.ds.record.getRecord('data');
                    this.state.profileRecord.whenReady(() => {
                      this.state.dataRecord.whenReady(() => {
                        if (!this.state.profileRecord.get("onboardingComplete")) {
                          Actions.onboard({ds: this.props.ds, username: this.state.username, profileRecord: this.state.profileRecord, dataRecord: this.state.dataRecord});
                        } else {
                          Actions.home({ds: this.props.ds, username: this.state.username, profileRecord: this.state.profileRecord, dataRecord: this.state.dataRecord});
                        }
                      })
                    })
                  }
                })
              }}
              title="Register"
            />

          </View>
         </View>
        </Modal>
    );
  }
}
