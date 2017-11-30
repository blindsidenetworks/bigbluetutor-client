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
  }

  render() {
    return (
      <View>
        <NavigationBar/>
        <FlatList
          data={ this.state.messagesKeys }
          extraData={ this.state.messagesKeys }
          renderItem={({item}) =>
            <Card
              title={ item }
              image={{ uri: this.state.messages[item].pic }}
            >
            <Button
              title="click"
              onPress={() => { Actions.messages({props: this.props, username: item})}}
            />
            </Card>
          }
          keyExtractor = {(item, index) => item}
        />
      </View>
    );
  }
}
