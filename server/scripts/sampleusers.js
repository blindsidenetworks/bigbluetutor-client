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
var Deepstream = require("deepstream.io");
var RethinkDB = require("deepstream.io-storage-rethinkdb");
var deepstreamClient = require("deepstream.io-client-js");
var dotenv = require("dotenv");

var config = dotenv.config().parsed;
const server = new Deepstream("conf/config.yml");

var profiles =
[
  {'stars': [], 'requestMeetings': [], 'messages': {}, 'pendingMeetings': [], 'username': 'jason thompson', 'meeting': '', 'password': ''},
  {'stars': [], 'onboardingComplete': false, 'requestMeetings': [], 'messages': {}, 'pendingMeetings': [], 'username': 'sally smith', 'meeting': ''},
  {'stars': [], 'requestMeetings': [], 'messages': {}, 'pendingMeetings': [], 'username': 'adam wong', 'meeting': '', 'password': ''},
  {'stars': [], 'onboardingComplete': false, 'requestMeetings': [], 'messages': {}, 'pendingMeetings': [], 'username': 'john doe', 'meeting': ''},
  {'stars': [], 'onboardingComplete': false, 'requestMeetings': [], 'messages': {}, 'pendingMeetings': [], 'username': 'jane doe', 'meeting': ''},
  {'stars': [], 'onboardingComplete': false, 'requestMeetings': [], 'messages': {}, 'pendingMeetings': [], 'username': 'julia mcdonald', 'meeting': ''}
];

var users =
[
  {'profilePic': 'http://www.freeiconspng.com/uploads/msn-people-person-profile-user-icon--icon-search-engine-16.png', 'categories': ['Tax', 'Accounting', 'Biology', 'Geography'], 'ratings': {}, 'tutor': true, 'username': 'jason thompson', 'description': 'I like business', 'position': 'no position', 'subjects': ['Business', 'Science', 'Social Sciences']},
  {'profilePic': 'http://www.freeiconspng.com/uploads/msn-people-person-profile-user-icon--icon-search-engine-16.png', 'ratings': {}, 'tutor': false, 'username': 'sally smith', 'description': 'I like math and history', 'position': 'no position'},
  {'profilePic': 'http://www.freeiconspng.com/uploads/msn-people-person-profile-user-icon--icon-search-engine-16.png', 'ratings': {}, 'tutor': false, 'username': 'adam wong', 'description': 'I like to study the arts.', 'position': 'no position'},
  {'profilePic': 'http://www.freeiconspng.com/uploads/msn-people-person-profile-user-icon--icon-search-engine-16.png', 'categories': ['Visual Arts', 'Algebra', 'Chemistry', 'Physics', 'Astronomy', 'History'], 'ratings': {}, 'tutor': true, 'username': 'john doe', 'description': 'I love science', 'position': 'no position', 'subjects': ['Arts', 'Math', 'Science', 'Social Sciences']},
  {'profilePic': 'http://www.freeiconspng.com/uploads/msn-people-person-profile-user-icon--icon-search-engine-16.png', 'categories': ['Abstract Art', 'Astronomy', 'Anthropology', 'Finance', 'Entrepreneurship'], 'ratings': {}, 'tutor': true, 'username': 'jane doe', 'description': 'I like business', 'position': 'no position', 'subjects': ['Arts', 'Business', 'Science', 'Social Sciences']},
  {'profilePic': 'http://www.freeiconspng.com/uploads/msn-people-person-profile-user-icon--icon-search-engine-16.png', 'ratings': {}, 'tutor': false, 'username': 'julia mcdonald', 'description': '', 'position': 'no position'}
];

server.set("storage", new RethinkDB({port: parseInt(config.DB_PORT), host: config.DB_HOST, database: config.DB_NAME, defaultTable: config.DB_DEFAULT_TABLE, splitChar: "/"}));
server.set("authenticationHandler",
{
  isValidUser: function(connectionData, authData, callback)
  {
    if(connectionData.remoteAddress === "127.0.0.1" && authData.password === "sp")
    {
      callback(true, {username: "SERVER", serverData:{role: "server"}});
    }
    else
    {
      callback({username: "Access denied"});
    }
  },
  canPerformAction: function(id, message, callback)
  {
    callback(null, true);
  },
  isReady: true
});

server.on("started", () =>
{
  var dsClient = deepstreamClient('localhost:6020').on("error", error => {console.log(error);});
  var j = 0;
  var exitIfDone = function()
  {
    if(j === profiles.length + users.length)
    {
      dsClient.close();
      server.stop();
      process.exit();
    }
    else
    {
      setTimeout(exitIfDone, 100);
    }
  }

  dsClient.login({username: "server", password: "sp"}, () =>
  {
    var i;
    for(i = 0; i < profiles.length; ++i)
    {
      (function(i)
      {
        dsClient.record.getRecord("profile/" + profiles[i].username).whenReady(record =>
        {
          record.set(profiles[i]);
          ++j;
        })
      })(i);
    }
    for(i = 0; i < profiles.length; ++i)
    {
      (function(i)
      {
        dsClient.record.getRecord("user/" + users[i].username).whenReady(record =>
        {
          record.set(users[i]);
          ++j;
        });
      })(i);
    }
    exitIfDone();
  });
});

server.start();
