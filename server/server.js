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
const Deepstream = require("deepstream.io");
const RethinkDB = require("deepstream.io-storage-rethinkdb");
const deepstreamClient = require("deepstream.io-client-js");
const GoogleAuth = require("google-auth-library");
const dotenv = require("dotenv");
const r = require("rethinkdb");
const winston = require("winston");

var server = new Deepstream("conf/config.yml");
var dsClient;
var config = dotenv.config().parsed;
var connection = null;
var ready = false;
winston.level = config.LOG_LEVEL;

//Google auth setup
var googleClientID = config.GOOGLE_CLIENT_ID;
var iosGoogleClientID = config.IOS_GOOGLE_CLIENT_ID;
var auth = new GoogleAuth();
var client = new auth.OAuth2(googleClientID, "", "");
var iosClient = new auth.OAuth2(iosGoogleClientID, "", "");

function googleLogin(authData, callback)
{
  //Verify using the iOS client ID if the user is logging in from an iOS device
  //Otherwise, default to Android
  var clientID = googleClientID, authClient = client;
  if(authData.platform === "ios")
  {
    clientID = iosGoogleClientID;
    authClient = iosClient;
  }
  authClient.verifyIdToken(authData.idToken, clientID, (error, login) =>
  {
    if(error)
    {
      winston.error(error);
      callback(null, {username: "Access denied", clientData: {googleError: true}});
      return;
    }
    if(!login)
    {
      winston.error("Can't get payload from idToken");
      callback(null, {username: "Access denied", clientData: {googleError: true}});
      return;
    }
    var payload = login.getPayload();
    //Check if a user with a matching Google ID exists in the database
    r.db("deepstream").table("auth").filter(r.row("googleID").eq(payload.sub)).run(connection, (error, cursor) =>
    {
      if(error)
      {
        winston.error(error);
        callback(null, {username: "Access denied"});
        return;
      }
      cursor.toArray(function(error, profiles)
      {
        if(error)
        {
          winston.error(error);
          callback(null, {username: "Access denied"});
          return;
        }
        if(profiles.length === 1 && profiles[0].username)
        {
          //Found user, so set the profile picture and log the user in with their username
          dsClient.record.getRecord("user/" + profiles[0].username).whenReady(userRecord =>
          {
            userRecord.set("profilePic", payload.picture);
            callback(true, {username: profiles[0].username, serverData:{idToken: authData.idToken, role: "user"}, clientData: {username: profiles[0].username}});
          });
        }
        else if(profiles.length > 1)
        {
          //There should be at most one user with the given Google ID
          winston.error("More than one user with given Google ID");
          callback(null, {username: "Access denied"});
        }
        else if(authData.username)
        {
          //No user found, so user needs to set a username to create an account
          //If a username was requested, attempt to create the account. Otherwise, do not log in
          winston.info("Creating user with username", authData.username);
          dsClient.rpc.make("createUser", {googleID: payload.sub, username: authData.username}, (error, result) =>
          {
            if(error)
            {
              winston.error(error);
              callback(null, {username: "Access denied", clientData: result});
            }
            else if(result.username)
            {
              //User creation succeeded
              dsClient.record.getRecord("user/" + result.username).whenReady(userRecord =>
              {
                userRecord.set("profilePic", payload.picture);
                callback(true, {username: result.username, serverData:{idToken: authData.idToken, role: "user"}, clientData: result});
              });
            }
            else
            {
              //No username was returned, so creating the user failed
              callback(null, {username: "Access denied", clientData: result});
            }
          });
        }
        else
        {
          winston.error("No user with matching Google ID exists and no username was given. Redirecting to account creation page");
          callback(null, {username: "Access denied", clientData: {needsUsername: true}});
        }
      });
    });
  });
}

//Deepstream setup
server.set("authenticationHandler",
{
  isValidUser: function(connectionData, authData, callback)
  {
    //Deny login if the server is not yet ready and the user logging in is not the server
    if (!(ready || (connectionData.remoteAddress === "127.0.0.1" && !authData.idToken)))
    {
      callback({username: "Access denied"});
    }
    //Login with Google idToken
    else if(authData.idToken)
    {
      googleLogin(authData, callback);
    }
    else if(connectionData.remoteAddress === "127.0.0.1")
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

server.set("storage", new RethinkDB({port: parseInt(config.DB_PORT), host: config.DB_HOST, database: config.DB_NAME, defaultTable: config.DB_DEFAULT_TABLE, splitChar: "/"}));

server.on("started", () =>
{
  dsClient = deepstreamClient('localhost:6020').on("error", error =>
  {
    winston.error(error);
  });
  dsClient.login({
    username: 'server'
  }, (success, data) =>
  {
    if(!success)
    {
      winston.error("Error starting client");
      return;
    }

    dsClient.presence.subscribe((username, status) =>
    {
      dsClient.record.has("user/" + username, (error, hasRecord) =>
      {
        if(error)
        {
          winston.error(error);
          return;
        }
        if(!hasRecord) {return;}
        dsClient.record.getRecord("user/" + username).whenReady(record =>
        {
          record.set("online", status);
        });
      });
    });

    dsClient.presence.getAll(users =>
    {
      var i;
      for(i = 0; i < users.length; ++i)
      {
        (function (i)
        {
          dsClient.record.has("user/" + users[i], (error, hasRecord) =>
          {
            if(error)
            {
              winston.error(error);
              return;
            }
            if(!hasRecord) {return;}
            deepstreamClient.record.getRecord("user/" + users[i]).whenReady(record =>
            {
              record.set("online", true);
            });
          });
        })(i);
      }
      ready = true;
      winston.info("Server ready");
    });
  });
});

r.connect({host: config.DB_HOST, port: config.DB_PORT}, (error, conn) =>
{
  if(error)
  {
    throw error;
  }
  connection = conn;
  r.db("deepstream").table("user").update({online: false}).run(connection, (error) =>
  {
    if(error) {throw error;}
    server.start();
  });
});
