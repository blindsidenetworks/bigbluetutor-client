#BigBlueTutor ionic client

A BigBlueButton social platform app for tutors and students.

##Current Platforms:
Android
Browser

##Future Platforms:
iOS

##How it works:
Tutors:
1. Sign up
2. Choose categories
3. Connect with Students!

Students:
1. Sign up
3. Find tutors for categories
4. Connect with Tutors!

#Setup:

you will need to install npm and ionic

1. [install node](https://docs.npmjs.com/getting-started/installing-node)
2. npm install -g cordova ionic

clone this repo into your local machine

##updating and first install:
if this is a fresh clone or you have updated this repository you will need to update the plugins and node modules to ensure you are up to date

1. npm update
2. ionic cordova prepare

You will need to add a config file with your google oauth information and server information
The template file is in **src/config/TEMPLATEenv.ts**. Please create a new file called **env.ts** with the placeholder values filled out


##adding different platforms
Ionic support all 3 platforms (iOS, Android, Browser)
To add a platform simply run **ionic cordova platform add <platform>**
To remove a platform is equally easy **ionic cordova platform remove <platform>**

##running

browser:
ionic serve

android
ionic cordova run android

ios
ionic cordova run ios

details:
This project is built with the ionic client for mobile and web applications.
This repository contains only the client code to find the server that this code interacts please see [bigbluetutor-server](https://github.com/blindsidenetworks/bigbluetutor-server)
To enter meetings, all tutor-student interactions are done through [BigBlueButton](https://github.com/bigbluebutton/bigbluebutton)
