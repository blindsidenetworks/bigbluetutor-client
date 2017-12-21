/*
BigBlueButton open source conferencing system - http://www.bigbluebutton.org/

Copyright (c) 2017 BigBlueButton Inc. and by respective authors (see below).

This file is part of BigBlueTutor.

BigBlueTutor is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

BigBlueTutor is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with BigBlueTutor.  If not, see <http://www.gnu.org/licenses/>.
*/
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
