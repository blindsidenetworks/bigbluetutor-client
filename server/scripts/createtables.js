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
//We need to wait some time until the tables are created before deleting the test records
const waitTime = 3000;
var tables = ["auth", "profile", "user"];

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
  //The script will exit once all 4 records have been deleted
  var j = 0;
  var exitIfDone = function()
  {
    if(++j === tables.length + 1)
    {
      dsClient.close();
      server.stop();
      process.exit();
    }
  }

  dsClient.login({username: "server", password: "sp"}, () =>
  {
    dsClient.record.getRecord("test").whenReady(record =>
    {
      record.on("delete", () => {exitIfDone();});
      setTimeout(() => {record.delete()}, waitTime);
    });
    for(var i = 0; i < tables.length; ++i)
    {
      dsClient.record.getRecord(tables[i] + "/test").whenReady(record =>
      {
        record.on("delete", () => {exitIfDone();});
        setTimeout(() => {record.delete()}, waitTime);
      });
    }
  });
});

server.start();
