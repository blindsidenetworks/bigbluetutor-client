import React, { Component } from 'react';
import {
  Button,
  Modal,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  StyleSheet,
  FlatList,
  Text,
  Image,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import { RadioButtons } from 'react-native-radio-buttons';

const styles = StyleSheet.create({
  radio : {
    flex: 1,
    flexDirection: 'row'
  },
  roleContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  image: {
    resizeMode: 'contain'
  },
  descContainer: {
    flexDirection: 'column'
  },
  title: {
  },
  textInput: {
    borderWidth: 1
  }
});

export default class Onboard extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      tutor: false,
      subjects:[]
    }
  }

  componentWillMount() {
    var categories = this.props.dataRecord.get('categories');
  }

  setModalVisible(visible) {
    this.state.modalVisible = visible;
  }

  selectRole(role) {
    console.log(role);
    if(role === "Tutor") {
      this.state.tutor = true
    } else {
      this.state.tutor = false
    }
  }

  renderRole(role, selected, onSelect, index) {
    const style = selected ? { fontWeight: 'bold'} : {};
    return (
      <TouchableOpacity
        onPress={ onSelect }
        key={index}
      >
        <Image
          style={ styles.image }
          source={ role === "Tutor"? require('../assets/tutor.png') : require('../assets/student.png') }
        />
          <Text
            style={ style }
          >
            { role }
          </Text>
      </TouchableOpacity>
    );
  }

  register() {
    if(this.state.tutor) {
      this.props.ds.rpc.make('registerTutor', { username: this.props.username, categories: ['none'] }, ()=> {});
    }
    this.props.ds.rpc.make('changeDescription', { username: this.props.username, description: this.state.description }, () => {});
    this.props.profileRecord.set("onboardingComplete", true);
    Actions.home(this.props);
  }

  render() {
    return (
        <Modal
          animationType="slide"
          transparent={ false }
          visible={ this.state.modalVisible }
          onRequestClose={ () => { Actions.pop() } }
        >
            <Swiper
              loop={ false }
            >
              <View
                style= { styles.roleContainer }
              >
                <RadioButtons
                  options = { ['Student', 'Tutor' ] }
                  onSelection={ this.selectRole.bind(this) }
                  renderOption={ this.renderRole }
                  optionContainerStyle= { styles.radio }
                />
                <FlatList
                  data={ this.state.subjects }
                  renderItem={ ({ item }) => <Text>{ item.subject }</Text> }
                />
                <FlatList
                  data={ this.state.results }
                  renderItem={ ({ item }) => <Text>{ item.subject }</Text> }
                />
              </View>
              <View
                style={ styles.descContainer}
              >
                <Text
                  style={ styles.title }
                >
                  Tell us about yourself
                </Text>
                <TextInput
                  multiline
                  style={ styles.textInput }
                  onChangeText={ (text) => this.state.description = text }
                  value={ this.state.description }
                />
              </View>
              <View>
                <Text>
                  Terms and Conditions
                </Text>
                <Button
                  onPress={ this.register.bind(this) }
                  title="Accept"
                />
              </View>
            </Swiper>
        </Modal>
    );
  }
}
