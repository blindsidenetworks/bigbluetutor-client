import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
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
  }
})

export default class NavigationBar extends Component<{}> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={ styles.cont }
      >
        <View
          style={ styles.menu }
        >
          <View style={{width: null, height: null}} >

            { this.props.back?
              <Icon
                type="ionicon"
                name="md-arrow-back"
                size={ 50 }
                onPress={() => Actions[this.props.backKey].call()}
              />:
              <Icon
                name='menu'
                size={ 50 }
                onPress={() => Actions.drawerOpen(this.props)}
              />
            }
          </View>
        </View>
        { this.props.title?
          <View>
            <Text>
              {this.props.title}
            </Text>
          </View> : null
        }
        <View
          style={ styles.search }
        >
          { this.props.noSearch? null :
              <View style={{width: null, height: null}}>
                <Icon
                  name='search'
                  size={ 50 }
                  onPress={() => {Actions.search(this.props);}}
                />
              </View>
          }
        </View>
      </View>
    );
  }
}
