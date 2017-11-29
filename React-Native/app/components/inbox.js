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
    console.log(Object.keys(this.props))
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    this.setState({
      //messages: this.props.profileRecord.get('messages')
    })
  }

  render() {
    return (
      <View>
        <NavigationBar/>
        <FlatList
          data={[]}
          renderItem={({item}) => <ListItem title={item} />}
          renderSectionHeader={({section}) => <Header title={section.title} />}
        />
      </View>
    );
  }
}
