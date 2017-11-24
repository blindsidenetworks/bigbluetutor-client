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

export default class Onboard extends Component<{}> {

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
                    Actions.home({ds: this.props.ds});
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
