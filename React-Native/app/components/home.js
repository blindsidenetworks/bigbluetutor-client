import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  FlatList,
  View
} from 'react-native';

import NavigationBar from './navigationBar';

import {Button, Icon, Card} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  page: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    width: null,
    height: null
  }
})

export default class HomePage extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      //profilePic: this.props.profileRecord.get('profilePic')
    }
  }

  render() {
    return (
      <View
        style={ styles.page }
      >
        <NavigationBar props />
        <View
          style={ styles.content }
        >
          <Card
            title={ this.props.username }
          >
          </Card>
        </View>
      </View>
    );
  }
}
