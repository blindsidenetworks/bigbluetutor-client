import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  Button,
  StyleSheet,
  Text,
  FlatList,
  ListItem,
  View
} from 'react-native';

import { SearchBar, Card } from 'react-native-elements';
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
        <SearchBar
          onChangeText={this.onChangeText.bind(this)}
          onClearText={this.onClearText.bind(this)}
        />
        <FlatList
          data={ this.state.results }
          renderItem={({item}) =>
            <Card
              title={ item.username }
              image={{ uri: item.profilePic }}
              >
              <Button
                raised
                onPress={() => this.selectUser.bind(this)(item)}
                title="Talk"
              />
            </Card>
          }
          extraData={ this.state.results }
          keyExtractor = {(item, index) => item.username}
        />
      </View>
    );
  }
}
