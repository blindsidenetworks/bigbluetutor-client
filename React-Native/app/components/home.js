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

const styles = StyleSheet.create({
  page: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  menu: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  search: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  cont: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    minHeight: 30
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
       <View
          style={ styles.cont }
        >
          <View
            style={ styles.menu }
          >
            <View style={{width: null, height: null}} >
              <Icon
                name='menu'
                onPress={() => Actions.drawerOpen()}
              />
            </View>
          </View>
          <View
            style={ styles.search }
          >
            <View style={{width: null, height: null}}>
              <Icon
                name='search'
                onPress={() => {Actions.search(this.props);}}
              />
            </View>
          </View>
        </View>
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
