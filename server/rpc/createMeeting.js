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
var crypto = require('crypto');
var https = require('https');
const winston = require("winston");
const dotenv = require("dotenv");
const config = dotenv.config().parsed;

winston.level = config.LOG_LEVEL;

function createRoom(meetingId, fullName, callback) {
  const defaultModeratorPassword = "mp";
  const defaultAttendeePassword = "ap";
  var meetingId = meetingId.split(' ').join('+');
  var fullName = fullName.split(' ').join('+');
  var url = config.BIGBLUEBUTTON_URL + 'bigbluebutton/api/create?';
  var params = 'name=' + meetingId + '&meetingID=' + meetingId  + '&attendeePW=' + defaultAttendeePassword + '&moderatorPW=' + defaultModeratorPassword + '&record=false';
  var checksum = crypto.createHash('sha1').update('create' + params + config.BIGBLUEBUTTON_SECRET).digest('hex');
  url += params + '&checksum=' + checksum;

  https.get(url, function(res) {
    var meetingUrl = config.BIGBLUEBUTTON_URL + 'bigbluebutton/api/join?';
    var voiceBridge = Math.floor(Math.random() * (90000) + 10000);
    var params = 'fullName=' + fullName + '&meetingID=' + meetingId + '&password=' + defaultAttendeePassword + '&voiceBridge=' + voiceBridge + '&redirectClient=true&clientURL=' + config.BIGBLUEBUTTON_URL + 'html5client/join';
    var checksum = crypto.createHash('sha1').update('join' + params + config.BIGBLUEBUTTON_SECRET).digest('hex');
    meetingUrl += params + '&checksum=' + checksum;
    winston.debug(meetingUrl);
    callback(meetingUrl);
  });
}

module.exports = createRoom;
