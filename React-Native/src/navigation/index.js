import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Button,
  View
} from 'react-native';

import Home from '../home';
import Inbox from '../inbox';

import {
  StackNavigator,
  DrawerNavigator
} from 'react-navigation';

const Drawer = DrawerNavigator({
  Home: {
    screen: Home
  },
  Inbox: {
    screen: Inbox
  }

});

export default Drawer;
//AppRegistry.registerComponent("Menu", () => Drawer);
