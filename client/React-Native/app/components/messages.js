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
  Linking,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  Image,
  View
} from 'react-native';

import NavigationBar from './navigationBar';
import { Card, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#87CEFA'
  },
  messages: {
    flex:0.7,
    padding: 10
  },
  messageBar: {
    flex:0,
    flexDirection: 'row',
    minHeight: 50
  },
  extras: {
    flex: 0,
    minWidth: 30,
    paddingLeft: 15
  },
  input: {
    flex:1
  },
  send: {
    flex:0,
    minWidth: 30,
    paddingRight: 15
  }
})

export default class MessagesPage extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      text: ''
    }
  }

  componentDidMount() {
    this.setState({
      messages: this.props.props.profileRecord.get('messages')[this.props.username].messages
    })
    this.props.props.profileRecord.subscribe('messages',() => {
      this.setState({
        messages: this.props.props.profileRecord.get('messages')[this.props.username].messages
      })
    })
    this.props.props.profileRecord.subscribe('meeting', () => {
      this.joinMeeting()
    })
  }

  componentWillUnmount() {
    this.props.props.profileRecord.unsubscribe('messages')
    this.props.props.profileRecord.unsubscribe('meeting')
  }

  sendMessage() {
    if(this.state.text != "") {
      var msg = this.state.text;
      this.state.text = '';
      this.props.props.ds.rpc.make('sendMessage', {client:this.props.props.profileRecord.get('username'), contact:this.props.username, message:msg}, ( error, result ) => {});
      var tempMessages = this.props.props.profileRecord.get('messages');
      tempMessages[this.props.username].messages.push({user:this.props.props.profileRecord.get('username'), message:msg});
      this.props.props.profileRecord.set('messages', tempMessages);
      this.setState({messages: this.props.props.profileRecord.get('messages')[this.props.username].messages, text: ''});
    }
  }

  requestMeeting() {
    this.props.props.ds.rpc.make('requestMeeting', {client: this.props.props.profileRecord.get('username'), contact:this.props.username}, () => {})
  }

  joinMeeting() {
    var url = this.props.props.profileRecord.get('meeting');
    if (url) {
      Linking.openURL(url)
    }
  }

  declineMeeting() {
    this.props.props.ds.rpc.make('declineMeeting', {client: this.props.props.profileRecord.get('username'), contact:this.props.username}, () => {})
  }

  endMeeting() {
    this.props.props.ds.rpc.make('endMeeting', {client: this.props.props.profileRecord.get('username'), contact:this.props.username}, () => {})
  }

  render() {
    return (
      <View
        style={ styles.page }
      >
        <NavigationBar
          back={true}
          backKey={"inbox"}
          noSearch={true}
          title={this.props.username}
        />
        <FlatList
          style={ styles.messages }
          data={ this.state.messages }
          extraData={ this.state.messages }
          renderItem={({item}) => {
              if(item.special) {
                switch(item.special) {
                  case "IncomingRequest":
                    return (
                      <Card
                        title={ item.message }
                      >
                        <Button
                          title={'Accept'}
                          onPress={ this.requestMeeting.bind(this) }
                        />
                        <Button
                          title={'Decline'}
                          onPress={ this.declineMeeting.bind(this) }
                        />
                      </Card>
                    )
                  case "OutgoingRequest":
                    return (
                      <Card
                        title={ item.message }
                      />
                    )
                  case "ActiveSession":
                    return (
                      <Card
                        title={ item.message }
                      >
                        <Button
                          title={'Join'}
                          onPress={ this.joinMeeting.bind(this) }
                        />
                        <Button
                          title={'End Meeting'}
                          onPress={ this.endMeeting.bind(this) }
                        />
                      </Card>
                    )
                  case "DeclinedRequest":
                    return (
                      <Card
                        title={ item.message }
                      >
                      </Card>
                    )
                  case "EndedSession":
                    return (
                      <Card
                        title={ item.message }
                      >
                      </Card>
                    )
                }
              } else if (item.user == this.props.username) {
                return(
                  <View
                    style={{flex:1, flexDirection:'row', margin:15, minHeight:30 }}
                  >
                    <View
                      style={{ flex:0.1, flexDirection: 'column', justifyContent:'flex-start' }}
                    >
                      <Image
                        style={{flex:1, marginRight:10, resizeMode: 'contain'}}
                        source={{ uri: this.props.props.profileRecord.get('messages')[item.user].pic }}
                      />
                    </View>
                    <Text
                      style={{ flex:0.6, backgroundColor: '#ffe' }}
                    >
                      { item.message }
                    </Text>
                  </View>
                )
              } else {
                return(
                  <View
                    style={{ flexDirection:'row', justifyContent:'flex-end', margin:15 }}
                  >
                    <Text
                      style={{ flex:0.6, backgroundColor: '#8e6', textAlign:'right' }}
                    >
                      { item.message }
                    </Text>
                  </View>
                )
              }
            }
          }
          keyExtractor = { (item, index) => this.state.messages.indexOf(item) }
        />
        <View
          style={ styles.messageBar }
        >
          <Icon
            raised
            style={ styles.extras }
            type='material-community'
            name={'webcam'}
            onPress={ this.requestMeeting.bind(this) }
          />
          <TextInput
            style={ styles.input }
            onChangeText={ (text) => this.setState({text}) }
            value={ this.state.text }
          />
          <Icon
            raised
            style={ styles.send }
            name={'send'}
            onPress={ this.sendMessage.bind(this) }
          />
        </View>
      </View>
    );
  }
}
