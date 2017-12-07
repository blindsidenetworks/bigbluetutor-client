import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  Button,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#3F89E2'
  },
  imageOuterContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageInnerContainer: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  image: {
    flex:1,
    resizeMode: 'contain'
  },
  listContainer: {
    flex:1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 30
  },
  text: {
    color: '#fff',
    fontSize: 30
  }
})

export default class Menu extends Component<{}> {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View
        style={ styles.container}
      >
        <View
          style={ styles.imageOuterContainer }
        >
            <Image
            style={ styles.image }
              source={ require('../assets/logo.png') }
            />
        </View>
        <View
          style={ styles.listContainer }
        >
          <View
            style={ styles.item }
          >
            <TouchableOpacity
              onPress={() => Actions.home(this.props)}
            >
              <Text
                style={ styles.text }
              >
                Home
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={ styles.item}
          >
            <TouchableOpacity
              onPress={() => Actions.inbox(this.props)}
            >
              <Text
                style={ styles.text }
              >
                Inbox
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={ styles.item}
          >
            <TouchableOpacity
              onPress={() => Actions.drawerClose()}
            >
              <Text
                style={ styles.text }
              >
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
