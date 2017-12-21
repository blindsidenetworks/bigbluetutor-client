/*
BigBlueButton open source conferencing system - http://www.bigbluebutton.org/

Copyright (c) 2017 BigBlueButton Inc. and by respective authors (see below).

This file is part of BigBlueTutor.

BigBlueTutor is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

BigBlueTutor is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with BigBlueTutor.  If not, see <http://www.gnu.org/licenses/>.
*/
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
  ScrollView,
  Text,
  Image,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import { RadioButtons } from 'react-native-radio-buttons';
import Config from 'react-native-config';
import PushNotification from 'react-native-push-notification';

const styles = StyleSheet.create({
  radio : {
    flex: 1,
    flexDirection: 'row'
  },
  roleContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  selectedImage: {
    flex: 1,
    resizeMode: 'contain'
  },
  image: {
    tintColor: '#208',
    flex: 1,
    resizeMode: 'contain'
  },
  descContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  title: {
    flex: 1,
    fontSize: 30,
    minHeight: 25
  },
  textInput: {
    flex: 9,
    borderWidth: 1,
    margin: 15,
    marginTop: 0,
    textAlignVertical: 'top'
  },
  tosContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  tosTitle: {
    flex: 1,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  tos: {
    flex: 8
  },
  accept: {
    flex: 1,
    marginBottom: 40
  }
});

export default class Onboard extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      tutor: false,
      subjects:[],
      showAccept: true
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

  showAccept() {
    this.setState({
      modalVisible: this.state.modalVisible,
      tutor: this.state.tutor,
      subjects:this.state.subjects,
      showAccept: true
    })
  }

  renderRole(role, selected, onSelect, index) {
    const style = selected ? { fontWeight: 'bold', color: '#208', fontSize: 20, marginTop: 15} : {fontSize: 20, marginTop: 15};
    return (
      <TouchableOpacity
        onPress={ onSelect }
        key={index}
        style= { styles.container }
      >
        <View
          style= {{ flex: 1,flexDirection:'row'}}
        >
          <Image
            style={ selected? styles.selectedImage : styles.image }
            source={ role === "Tutor"? require('../assets/tutor.png') : require('../assets/student.png') }
          />
        </View>
        <View
          style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}
        >
          <Text
            style = { style }
          >
            { role }
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  register() {
    if(this.state.tutor) {
      this.props.ds.rpc.make('registerTutor', { username: this.props.username, categories: ['none'] }, ()=> {});
    }
    this.props.ds.rpc.make('changeDescription', { username: this.props.username, description: this.state.description }, () => {});
    this.props.profileRecord.set("onboardingComplete", true);
    var configurePush = this.props.configurePush.bind(this)
    configurePush()
    Actions.reset('drawer', this.props);
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
                  renderContainer={RadioButtons.getViewContainerRenderer({flex:1, flexDirection: 'row', justifyContent: 'center'})}
                  optionContainerStyle= { styles.radio }
                />
              </View>
              <View
                style={ styles.descContainer}
              >
                <View
                  style={{ flex:1, flexDirection:'row', justifyContent: 'center', margin: 15, marginBottom: 0 }}
                >
                  <Text
                    style={ styles.title }
                  >
                    Tell us about yourself
                  </Text>
                </View>
                <TextInput
                  multiline
                  style={ styles.textInput }
                  underlineColorAndroid="transparent"
                  onChangeText={ (text) => this.state.description = text }
                  value={ this.state.description }
                />
              </View>
              <View
                style= { styles.tosContainer}
              >
                <View
                  style={ styles.tosTitle }
                >
                  <Text
                    style={ styles.title }
                  >
                    Terms and Conditions
                  </Text>
                </View>
                <View
                  style={ styles.tos }
                >
                  <ScrollView
                    onScroll={ this.showAccept.bind(this) }
                  >
                    <Text
                      style={{padding: 30, fontSize: 16}}
                    >
                      “As Is” Services. Blindside Networks Inc. (“Blindside Networks”) grants You a non-exclusive, non-transferable, limited, and revocable license to use select Blindside Networks services (“Services”) for personal, non-commercial purposes and in accordance with these Terms of Use. You acknowledge and agree that all Services provided to You by Blindside Networks pursuant to these Terms of Use are on an “as is” basis, without representations, warranties, and condition of any kind and may be modified or discontinued by Blindside Networks at any time. To the extent that the Services relate to the BigBlueButton open source software project, your license to that software is subject to the licenses then in effect for it in addition to these Terms of Use.
                      {'\n'}
                      Use & Content. You acknowledge and agree that the Services may not be used in violation of any legislation or license applicable to You or that is any way fraudulent or unlawful including without limitation, to send, knowingly receive, download, upload, use or re-use any audio, video, text, or images (“Content”) that is abusive, defamatory, in breach of confidence, obscene or menacing, in breach of copyright or privacy or any other rights; or to damage Blindside Networks’ property, interfere with or disrupt Blindside Networks’ system or other users. You agree to allow Blindside Networks and its applicable contractors to freely host, reproduce, transmit, modify, display and otherwise use your Content (in whole or in part) as reasonably necessary to provide the Services to you. You acknowledge and agree that Blindside Networks does not control or monitor the Content nor guarantee the accuracy, integrity, security or quality of such Content or the Services.
                      {'\n'}
                      Termination & Removal of Content. Blindside Networks reserves the right to terminate Your license to use the Services at any time in Blindside Networks’ sole and unfettered discretion. Blindside Networks also reserves the right to remove Content which it deems, in its sole discretion, will or may subject it to liability or is dangerous, offensive, pornographic, or in violation of law or regulations currently in effect. Such termination or removal may be immediate and without notice.
                      {'\n'}
                      Indemnification. You Customer agree to indemnify, defend, and hold harmless Blindside Networks and its directors, officers, employees, members, volunteers, affiliates, subcontractors, independent contractors, distributors, and agents from and against all losses, damages, actions or causes of action, suits, claims, demands, penalties and interest arising in connection with or out of your use of the Services.
                      {'\n'}
                      These Terms of Use are the final, complete and exclusive agreement of the parties with respect to the subject matter hereof; they supersede and merge all prior discussions between the parties with respect to such subject matter.
                      {'\n'}
                      January 19, 2017
                    </Text>
                  </ScrollView>
                </View>
                <View
                  style = { this.state.showAccept? styles.accept : {display:'none'} }
                >
                  <Button
                    onPress={ this.register.bind(this) }
                    title="Accept"
                  />
                </View>
              </View>
            </Swiper>
        </Modal>
    );
  }
}
