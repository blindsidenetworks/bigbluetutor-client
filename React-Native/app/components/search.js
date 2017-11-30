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
    this.props.ds.rpc.make('requestMeeting', { client: this.props.profileRecord.get('username'), contact:user.username }, () => {});
    Actions.inbox(this.props);
    //Actions.messages({props: this.props, username: user});
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
