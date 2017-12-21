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
/*
Test cases:
Success
User is already a tutor
User does not exist

Also tests changeDescription
*/

var deepstream = require("deepstream.io-client-js");

var client = deepstream("localhost:6020").on("error", (error) =>
{
  console.log(error);
});

client.login({username: "server", password: "sp"}, (success, data) =>
{
  if(!success) {return;}

  console.log("clientData:\n" + data);

  //Success
  client.rpc.make("registerTutor", {username: "test", categories: ["French", "Japanese", "French", "Latin", "Calculus"]}, (error, result) =>
  {
    if(error)
    {
      console.log(error)
      return;
    }

    console.log(result);

    //User is already a tutor
    client.rpc.make("registerTutor", {username: "test"}, (error, result) =>
    {
      if(error)
      {
        console.log(error)
        return;
      }

      console.log(result);

      //User does not exist
      client.rpc.make("registerTutor", {username: "test2"}, (error, result) =>
      {
        if(error)
        {
          console.log(error)
          return;
        }

        console.log(result);

        //Test changeDescription
        client.rpc.make("changeDescription", {username: "test", description: "Hello, I am a BigBlueTutor user."}, (error, result) =>
        {
          if(error)
          {
            console.log(error)
            return;
          }

          console.log(result);
        });
      });
    });
  });
});
