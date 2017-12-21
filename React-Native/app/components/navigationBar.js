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
