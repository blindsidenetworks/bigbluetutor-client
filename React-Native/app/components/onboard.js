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
import Swiper from 'react-native-swiper';
import { RadioButtons } from 'react-native-radio-buttons';

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

  renderRole() {

  }

  render() {
    return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {Actions.pop()}}
        >
          <Swiper>
            <View>
              <RadioButtons
                options = { ['Student', 'Tutor' ] }
              />
            </View>
            <View>
            </View>
            <View>
            </View>
          </Swiper>
        </Modal>
    );
  }
}
