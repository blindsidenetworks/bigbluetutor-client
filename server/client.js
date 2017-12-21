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
const deepstream = require('deepstream.io-client-js');
const winston = require("winston");
const dotenv = require("dotenv");
const sendNotification = require('./rpc/push.js');
const config = dotenv.config().parsed;

winston.level = config.LOG_LEVEL;

//Deepstream setup
const deepstreamClient = deepstream('localhost:6020').on("error", error =>
{
  winston.error(error);
});

const createUser = require("./rpc/createuser")(deepstreamClient);
const meeting = require("./rpc/meeting")(deepstreamClient);

deepstreamClient.login({
  username: 'server'
}, function(success, data)
{
  winston.debug("Success:", success);
  // winston.debug("Data:", data);
});

deepstreamClient.record.getRecord('data').whenReady(dataRecord =>
{
  //HARD CODED CATEGORIES FOR NOW HERE
  dataRecord.set('categories',{
    'Language':['English','French','Spanish', 'Italian', 'German','Mandarin','Japanese','Arabic','Russian', 'Latin'],
    'Math':['Algebra','Calculus','Pre-Calculus','Geometry','Trigonometry'],
    'Business':['Accounting','Business Law', 'Business Management', 'Economics', 'Entrepreneurship', 'Finance', 'Marketing', 'Tax'],
    'Science':['Astronomy', 'Biology', 'Chemistry', 'Physics'],
    'Social Sciences':['Anthropology', 'Geography', 'History'],
    'Arts':['Abstract Art', 'Art History', 'Visual Arts']
  });
});

function changeDescription(data, response) {
  var username = data.username;
  deepstreamClient.record.getRecord('user/'+username).whenReady(userRecord => {
    userRecord.set("description", data.description);
    response.send({});
  });
}

function addDeviceToken(data, response) {
  var username = data.username;
  var platform = data.platform;
  var version = data.version;
  deepstreamClient.record.getRecord('profile/'+username).whenReady(userRecord => {
    var tokens = userRecord.get("deviceTokens");
    if (!tokens) {
      tokens = [];
    }
    if (tokens.filter(a => a.token === data.deviceToken).length <= 0) {
      tokens.push({
        token: data.deviceToken,
        platform: data.platform,
        version: data.version
      });
      userRecord.set('deviceTokens', tokens);
      winston.debug(userRecord.get('deviceTokens'));
    }
    response.send({});
  });
}

function removeDeviceToken(data, response) {
  var username = data.username;
  deepstreamClient.record.getRecord('profile/'+username).whenReady(userRecord => {

    var tokens = userRecord.get("deviceTokens");
    var tokenIndex = tokens.indexOf(data.deviceToken)
    if (tokenIndex !== -1) {
      tokens.splice(tokenIndex, 1);
      userRecord.set('deviceTokens', tokens);
    }
    response.send({});
  });
}


function registerTutor(data, response)
{
  winston.debug("registerTutor");
  var username = data.username;
  deepstreamClient.record.getRecord('user/'+username).whenReady(userRecord =>
  {
    deepstreamClient.record.getRecord('data').whenReady(dataRecord =>
    {
      var user = userRecord.get();

      //check for broader subjects
      var subjects = [];
      var categoryList = dataRecord.get('categories');
      var categories = Array.from(new Set(data.categories || []));
      if(categories.length === 0) {
        return;
      }

      for(var category in categoryList) {
        if (categoryList.hasOwnProperty(category) && subjects.indexOf(category) == -1) {
          for (var subcategory = 0; subcategory < categoryList[category].length; ++subcategory) {
            if(categories.indexOf(categoryList[category][subcategory]) != -1) {
              subjects.push(category);
              break;
            }
          }
        }
      }

      //make user tutor
      if (!user.tutor) {
        user.tutor = true;
        user.subjects = subjects;
        user.categories = categories;
        userRecord.set(user);
      }
      response.send({});
    });
  });
}

function sendMessage(data, response) {
  var contact = data.contact;
  var client = data.client;
  var message = data.message;
  deepstreamClient.record.has("profile/"+contact, (err, has) => {
    if (has) {
      var record = deepstreamClient.record.getRecord("profile/"+contact);
      var clientRecord = deepstreamClient.record.getRecord("profile/"+client);
      //profilePicture
      var userRecord = deepstreamClient.record.getRecord('user/'+client);
      userRecord.whenReady(() => {
        record.whenReady(() => {
          clientRecord.whenReady(() => {
            var messages = record.get('messages');
            var newMessagesCount = record.get('newMessagesCount');

            if (!messages) {
              messages = {client:{pic: userRecord.get('profilePic'), messages:[{user:client,message:message, special: false}]}}
              newMessagesCount[client] = 1;
            } else if(messages[client]) {
              messages[client].messages.push({user:client,message:message, special: false})
              newMessagesCount[client] += 1;
            } else {
              messages[client] = {pic: userRecord.get('profilePic'),messages: [{user:client,message:message, special: false}]}
              newMessagesCount[client] = 1;
            }
            record.set('newMessagesCount', newMessagesCount);
            record.set('messages', messages);
            sendNotification(record.get('deviceTokens'), client, message);
          });
       });
     });
    }
    response.send({});
  });
}

deepstreamClient.rpc.provide('changeDescription', changeDescription);
deepstreamClient.rpc.provide('addDeviceToken', addDeviceToken);
deepstreamClient.rpc.provide('removeDeviceToken', removeDeviceToken);
deepstreamClient.rpc.provide('registerTutor', registerTutor);
deepstreamClient.rpc.provide('sendMessage', sendMessage);
deepstreamClient.rpc.provide("createUser", createUser.createUser);
deepstreamClient.rpc.provide('requestMeeting', meeting.requestMeeting);
deepstreamClient.rpc.provide('declineMeeting', meeting.declineMeeting);
deepstreamClient.rpc.provide('endMeeting', meeting.endMeeting);
