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
