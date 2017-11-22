import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';


export default class Home extends Component<{}> {
  render() {
    return (
      <View>
        <Button
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
          title="toggle"
        />
        <Text>
          HOME
        </Text>
      </View>
    );
  }
}
