import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {Button, Icon} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

export default class HomePage extends Component<{}> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Icon
          name='menu'
        />
        <Icon
          name='search'
          onPress={() => {
            Actions.search(this.props);
          }}
        />
        <Text>
          HOME
        </Text>
      </View>
    );
  }
}
