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

import {Button, Icon, Card} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

export default class ProfilePage extends Component<{}> {

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
        <Card
          title={ 'hello' }
          image={{ uri: 'https://lh6.googleusercontent.com/-kz5FRzkVqso/AAAAAAAAAAI/AAAAAAAAAAA/AFiYof36V33FGiI1Vj-J_Cf0MZzj-TRc3Q/s96-c/photo.jpg' }}
        >
          <Button
            title='REQUEST SESSION'
          />
        </Card>
      </View>
    );
  }
}
