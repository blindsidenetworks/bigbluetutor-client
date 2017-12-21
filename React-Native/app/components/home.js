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
