import React, { Component } from 'react';
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  View
} from 'react-native';

import NavigationBar from './navigationBar';
import { Card, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column'
  },
  messages: {
    flex:0.7
  },
  messageBar: {
    flex:0,
    flexDirection: 'row',
    minHeight: 50
  },
  input: {
    flex:1,
    paddingLeft: 15
  },
  send: {
    flex:0,
    minWidth: 30,
    paddingRight: 15
  }
})

export default class MessagesPage extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      text: ''
    }
  }

  componentDidMount() {
    this.setState({
      messages: this.props.props.profileRecord.get('messages')[this.props.username].messages
    })
  }

  sendMessage() {
    console.log(this.state.text)
    if(this.state.text != "") {
      this.props.props.ds.rpc.make('sendMessage', {client:this.props.props.profileRecord.get('username'), contact:this.props.username, message:this.state.text}, ( error, result ) => {});
      var tempMessages = this.props.props.profileRecord.get('messages');
      tempMessages[this.props.username].messages.push({user:this.props.props.profileRecord.get('username'), message:this.state.text});
      this.props.props.profileRecord.set('messages', tempMessages);
      this.setState({messages: this.props.props.profileRecord.get('messages')[this.props.username].messages, text: ''});
    }
  }

  render() {
    return (
      <View
        style={ styles.page }
      >
        <NavigationBar/>
        <FlatList
          style={ styles.messages }
          data={ this.state.messages }
          extraData={ this.state.messages }
          renderItem={({item}) =>
            <Card
              title={ item.message }
            />
          }
          keyExtractor = {(item, index) => item.message}
        />
        <View
          style={ styles.messageBar }
        >
          <TextInput
            style={ styles.input }
            onChangeText={ (text) => this.setState({text})}
            value={ this.state.text }
          />
          <Icon
            raised
            style={ styles.send }
            name='send'
            onPress={ this.sendMessage.bind(this) }
          />
        </View>
      </View>
    );
  }
}
