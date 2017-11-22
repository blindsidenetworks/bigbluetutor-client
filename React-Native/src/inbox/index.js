import React, { Component } from 'react';
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Inbox extends Component<{}> {
  render() {
    return (
      <View>
        <Button
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
          title="toggle"
        />
        <Text>
          Inbox
        </Text>
      </View>
    );
  }
}
