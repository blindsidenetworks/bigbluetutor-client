import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';

export default class HomePage extends Component<{}> {
  render() {
    return (
      <View>
        <Button
          onPress={() => Actions.drawerOpen()}
          title="toggle"
        />
        <Text>
          HOME
        </Text>
      </View>
    );
  }
}
