import React, { Component } from 'react';
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  FlatList,
  View
} from 'react-native';

import NavigationBar from './navigationBar';
import { Card } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

export default class MessagesPage extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    this.setState({
      messages: this.props.props.profileRecord.get('messages')[this.props.username].messages
    })
  }

  render() {
    return (
      <View>
        <NavigationBar/>
        <FlatList
          data={ this.state.messages }
          extraData={ this.state.messages }
          renderItem={({item}) =>
            <Card
              title={ item }
              image={{ uri: item.pic }}
            >
            </Card>
          }
          keyExtractor = {(item, index) => item.pic}
        />
        <TextInput>
        </TextInput>
      </View>
    );
  }
}
