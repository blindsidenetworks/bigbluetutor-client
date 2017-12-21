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
const RethinkDB = require("deepstream.io-storage-rethinkdb");
const r = require("rethinkdb");
const dotenv = require("dotenv");
var config = dotenv.config().parsed;

r.connect({host: config.DB_HOST, port: config.DB_PORT}, (error, conn) => {
  if(error) {throw error;}

  r.db('deepstream').table('profile')
  .run(conn, function(err, cursor) {
    if (err) {throw err;}
    cursor.toArray(function(err, profiles) {
      if (err) {throw err;}
      console.log(profiles);
      for (var i in profiles) {
        var newMessagesCount = {};
        if(profiles[i].messages && Object.keys(profiles[i].messages).length > 0) {
          for (var j in profiles[i].messages) {
            newMessagesCount[j] = 0;
          }
          r.db("deepstream").table("profile").filter({'username':profiles[i].username}).update({newMessagesCount: newMessagesCount}).run(conn, (error, result) => {
             if(error) {throw error;}
             console.log(result);
          });

        } else {
          r.db("deepstream").table("profile").filter({'username':profiles[i].username}).update({newMessagesCount: {}}).run(conn, (error, result) => {
             if(error) {throw error;}
             console.log(result);
          });
        }
      }
    });
  });
/*
  r.db("deepstream").table("profile").update({newMessagesCount: {}}).run(conn, (error, callback) => {
    if(error) {throw error;}
    console.log(callback);
    return;
  });
*/
});
