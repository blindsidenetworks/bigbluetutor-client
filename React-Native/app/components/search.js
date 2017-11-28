import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  Button,
  StyleSheet,
  Text,
  FlatList,
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
      console.log(data)
      this.state.results = data.data;
    })
  }

  onClearText() {
    this.state.text = "";
  }

  selectCategory() {

  }

  render() {
    return (
      <View>
        <SearchBar
          onChangeText={this.onChangeText.bind(this)}
          onClearText={this.onClearText.bind(this)}
        />
        <FlatList
          data={this.state.results}
          renderItem={({item}) => <Text>{item.username}</Text>}
        />
      </View>
    );
  }
}
