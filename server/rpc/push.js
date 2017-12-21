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
var dotenv = require("dotenv");
const winston = require("winston");
const config = dotenv.config().parsed;
const fs = require('fs');

winston.level = config.LOG_LEVEL;

const settings = {
    gcm: {
        id: config.PUSH_SERVER_KEY,
        phonegap: true
    },
    apn: {
        token: {
            key: './apn.p8', // optionally: fs.readFileSync('./certs/key.p8')
            keyId: config.APN_KEY_ID,
            teamId: config.IOS_TEAM_ID,
        },
    },
    adm: {
        client_id: null,
        client_secret: null,
    },
    wns: {
        client_id: null,
        client_secret: null,
        notificationMethod: 'sendTileSquareBlock',
    }
};
const PushNotifications = require('node-pushnotifications');
const push = new PushNotifications(settings);
const gcm = require('node-gcm');
const apn = require('apn');

var apnProvider = new apn.Provider({
  token: {
    key: './apn.p8',
    keyId: config.APN_KEY_ID,
    teamId: config.IOS_TEAM_ID
  },
  production: false
});
// Single destination
//const registrationIds = 'INSERT_YOUR_DEVICE_ID';

// Multiple destinations
//const registrationIds = [];
//registrationIds.push('INSERT_YOUR_DEVICE_ID');
//registrationIds.push('INSERT_OTHER_DEVICE_ID');
//console.log(registrationIds);

function sendNotification(tokens, title, message) {

console.log(config.APN_KEY_ID);
console.log(config.IOS_TEAM_ID);
var apnp = fs.readFileSync('./apn.p8', 'utf8')
console.log(apnp);
  var androidTokens = tokens.filter(token => token.version === "react-native" && token.platform === 'android');
  var iosTokens = tokens.filter(token => token.version === "react-native" && token.platform === 'ios');
  var ionicTokens = tokens.filter(token => token.version === "ionic");

  var pushNotification = {
    title: title, // REQUIRED
    body: message, // REQUIRED
    custom: {
        sender: 'BigBlueTutor',
    },
    priority: 'high', // gcm, apn. Supported values are 'high' or 'normal' (gcm). Will be translated to 10 and 5 for apn. Defaults to 'high'
    collapseKey: '', // gcm for android, used as collapseId in apn
    contentAvailable: true, // gcm for android
    delayWhileIdle: true, // gcm for android
    restrictedPackageName: '', // gcm for android
    dryRun: false, // gcm for android
    icon: 'myicon', // gcm for android
    tag: '', // gcm for android
    color: '', // gcm for android
    clickAction: '', // gcm for android. In ios, category will be used if not supplied
    locKey: '', // gcm, apn
    bodyLocArgs: '', // gcm, apn
    titleLocKey: '', // gcm, apn
    titleLocArgs: '', // gcm, apn
    retries: 1, // gcm, apn
    encoding: '', // apn
    badge: 2, // gcm for ios, apn
    sound: 'ping.aiff', // gcm, apn
    launchImage: '', // apn and gcm for ios
    action: '', // apn and gcm for ios
    topic: 'org.reactjs.native.example.BigBlueTutor', // apn and gcm for ios
    category: '', // apn and gcm for ios
    mdm: '', // apn and gcm for ios
    urlArgs: '', // apn and gcm for ios
    truncateAtWordEnd: true, // apn and gcm for ios
  };

  var sender = new gcm.Sender(config.PUSH_AUTH_KEY);

  var message = new gcm.Message({
    collapseKey: '',
    priority: 'high',
    delayWhileIdle: true,
    notification: {
      title: title,
      icon: 'myicon',
      body: message
    }
  });

  var note = new apn.Notification();

  note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
  note.badge = 3;
  note.sound = "ping.aiff";
  note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
  note.payload = {'messageFrom': 'John Appleseed'};
  note.topic = "org.reactjs.native.example.BigBlueTutor";


  if(androidTokens.length) {
    var deviceTokens = androidTokens.map(a => a.token);
    sender.send(message, { registrationTokens: deviceTokens }, function (err, response) {
      if (err) {
        winston.error(err);
      } else {
        winston.debug(response);
      }
    });
  }

  if(iosTokens.length) {
    var deviceTokens = iosTokens.map(a => a.token);
    winston.debug(deviceTokens);
    apnProvider.send(note, deviceTokens).then((result) => {
     // if (err) {
     //   winston.error(err);
     // } else {
        winston.debug(result);
     // }
    });
  }

  if(ionicTokens.length) {
    var deviceTokens = ionicTokens.map(a => a.token);
    push.send(deviceTokens, pushNotification, (err, result) => {
      if (err) {
        winston.error(err);
      } else {
        winston.debug(result);
      }
    });
  }
}



module.exports = sendNotification;
