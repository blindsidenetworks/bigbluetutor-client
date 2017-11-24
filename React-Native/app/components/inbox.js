import React, { Component } from 'react';
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';

export default class InboxPage extends Component<{}> {
  render() {
    return (
      <View>
        <Button
          onPress={() => Actions.drawerOpen()}
          title="toggle"
        />
        <Text>
          Inbox
        </Text>
      </View>
    );
  }
}
