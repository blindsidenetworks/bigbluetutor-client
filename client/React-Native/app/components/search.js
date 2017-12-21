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
  AppRegistry,
  Platform,
  Button,
  StyleSheet,
  Text,
  FlatList,
  Image,
  View
} from 'react-native';

import { SearchBar, Card, Icon, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

export default class SearchPage extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      results: []
    }
  }

  componentWillMount() {
    this.props.ds.rpc.make('search', {param: this.state.text}, (error,data) => {
      console.log(data.data)
      this.setState({
        results: data.data,
        text: this.state.text
      })
    })
  }

  onChangeText(text) {
    this.state.text = text;
    this.props.ds.rpc.make('search', {param: this.state.text}, (error,data) => {
      console.log(data.data)
      this.setState({
        results: data.data,
        text: text
      })
    })
  }

  onClearText() {
    this.state.text = "";
  }

  selectUser(user) {
    if(this.props.profileRecord.get('messages') && this.props.profileRecord.get('messages')[user.username]) {
      Actions.inbox(this.props);
      Actions.messages({props: this.props, username: user.username});
    } else {
      var userRecord = this.props.ds.record.getRecord('user/'+user.username);
      userRecord.whenReady(() => {
        var tempMessages = this.props.profileRecord.get('messages');
        tempMessages[user.username] = {pic: userRecord.get('profilePic'),messages:[]};
        this.props.profileRecord.set('messages', tempMessages);
        Actions.inbox(this.props);
        Actions.messages({props: this.props, username: user.username});
      })
    }
  }

  render() {
    return (
      <View>
        <View
          style={{ flexDirection:'row'}}
        >
          <View
            style={{ flex: 1, flexDirection:'column', justifyContent:'center', backgroundColor: '#25262A' }}
          >
            <Icon
              style={{ }}
              type="ionicon"
              name="md-arrow-back"
              color='#fff'
              onPress={ () => { Actions.pop() }}
            />
          </View>
          <View
            style={{ flex:8 }}
          >
            <SearchBar
              style={{ }}
              onChangeText={this.onChangeText.bind(this)}
              onClearText={this.onClearText.bind(this)}
            />
          </View>
        </View>
        <View>
          <FlatList
            data={ this.state.results }
            renderItem={({item}) =>
              <ListItem
                roundAvatar
                avatar={{ uri: item.profilePic }}
                key={ item.username }
                title={ item.username }
                onPress={ () => this.selectUser.bind(this)(item) }
              />
            }
            extraData={ this.state.results }
            keyExtractor = {(item, index) => item.username}
          />
        </View>
      </View>
    );
  }
}
