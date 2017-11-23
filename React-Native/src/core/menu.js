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

export default class Menu extends Component<{}> {
  render() {
    return (
      <View>
        <Text>
        HI
        </Text>
        <Button
          onPress={() => Actions.home()}
          title="Home"
        />
        <Button
          onPress={() => Actions.inbox()}
          title="Inbox"
        />
        <Button
          onPress={() => Actions.drawerClose()}
          title="3"
        />
      </View>
    );
  }
}
