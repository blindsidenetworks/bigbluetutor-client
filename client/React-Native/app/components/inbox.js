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
  FlatList,
  View
} from 'react-native';

import NavigationBar from './navigationBar';
import { Card, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

export default class InboxPage extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    this.setState({
      messages: this.props.profileRecord.get('messages'),
      messagesKeys: Object.keys(this.props.profileRecord.get('messages'))
    })
    this.props.profileRecord.subscribe('messages',() => {
      this.setState({
        messages: this.props.profileRecord.get('messages'),
        messagesKeys: Object.keys(this.props.profileRecord.get('messages'))
      })
    })
    this.props.profileRecord.subscribe('meeting', () => {
      var url = this.props.profileRecord.get('meeting');
      if (url) {
        Linking.openURL(url)
      }
    })
  }

  componentWillUnmount() {
    this.props.profileRecord.unsubscribe('messages')
    this.props.profileRecord.unsubscribe('meeting')
  }

  render() {
    return (
      <View>
        <NavigationBar
          noSearch={true}
        />
        <FlatList
          data={ this.state.messagesKeys }
          extraData={ this.state.messagesKeys }
          renderItem={({ item }) =>
            <ListItem
              roundAvatar
              avatar={{ uri: this.state.messages[item].pic }}
              key={ item }
              title={ item }
              onPress={ () => { Actions.messages({ props: this.props, username: item })}}
            />
          }
          keyExtractor = { (item, index) => item }
        />
      </View>
    );
  }
}
