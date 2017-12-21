[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/blindsidenetworks/bigbluetutor-server/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/blindsidenetworks/bigbluetutor-server/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/blindsidenetworks/bigbluetutor-server/badges/build.png?b=master)](https://scrutinizer-ci.com/g/blindsidenetworks/bigbluetutor-server/build-status/master)
[![CircleCI](https://circleci.com/gh/blindsidenetworks/bigbluetutor-server.svg?style=shield)](https://circleci.com/gh/blindsidenetworks/bigbluetutor-server)


# bigbluetutor-server
A tutoring application for mobile devices that let Tutors and Students to connect by searching in topics of interest.

The BigBlueTutor server allows clients to connect through deepstream to communicate with each other.

# Setup:

## Server setup:

## Node.js setup
  1. Install the latest version of Node.js with the following terminal commands:
  2. sudo apt-get update
  3. sudo apt-get install curl
  4. curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
  5. sudo apt-get install build-essential nodejs

## RethinkDB installation
From https://www.rethinkdb.com/docs/install/ubuntu/
Enter the following commands in the terminal to install RethinkDB:
  1. source /etc/lsb-release && echo "deb http://download.rethinkdb.com/apt $DISTRIB_CODENAME main" | sudo tee /etc/apt/sources.list.d/rethinkdb.list
  2. sudo apt-get install wget
  3. wget -qO- https://download.rethinkdb.com/apt/pubkey.gpg | sudo apt-key add -
  4. sudo apt-get update
  5. sudo apt-get install rethinkdb

## RethinkDB setup
Create a new config file using the sample in /etc/rethinkdb: sudo cp /etc/rethinkdb/default.conf.sample /etc/rethinkdb/instances.d/instance1.conf
Start RethinkDB with **sudo /etc/init.d/rethinkdb restart**. This will allow RethinkDB to start automatically when you start your system

## RethinkDB Python driver setup
Run the following commands to install the RethinkDB Python driver:
  1. sudo apt-get install python python3 python3-pip
  2. pip3 install rethinkdb python-dotenv

## Creating a Google API Console project
Follow the instructions here to create a Google API Console Project: 
https://developers.google.com/identity/sign-in/web/devconsole-project
After this, you will need to enable the Google+ API:
From the Google API console, go to the Dashboard and click **Enable APIs and services**
Search for **Google+ API**
Click on the Google+ API result and click **Enable**

## Running the Deepstream server
Install git: **sudo apt-get install git**
Clone the server repo using git: **git clone https://github.com/blindsidenetworks/bigbluetutor-server.git**
Enter the BigBlueTutor server directory: **cd bigbluetutor-server**
Install the necessary Node modules: **npm install**
Create a new file named .env, and paste the following lines in the file:

*DB_HOST=localhost
DB_PORT=28015
DB_NAME=deepstream
DB_DEFAULT_TABLE=deepstream_records*

In the  .env file, add the line GOOGLE_CLIENT_ID=, followed by the Web Application Client ID of your Google API Console project
If you are running the server for the first time, run node scripts/createtables.js. This will create the necessary tables in the RethinkDB database 
Start the server with npm start. If you get an error like “Can't connect! Deepstream server unreachable on ws://localhost:6020/deepstream,” edit package.json and increase the value of SLEEPTIME in the start:all script.
