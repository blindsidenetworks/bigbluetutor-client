# BigBlueButton open source conferencing system - http://www.bigbluebutton.org/
#
# Copyright (c) 2017 BigBlueButton Inc. and by respective authors (see below).
#
# This file is part of BigBlueTutor.
#
# BigBlueTutor is free software: you can redistribute it and/or modify
# it under the terms of the GNU Lesser General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# BigBlueTutor is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Lesser General Public License for more details.
#
# You should have received a copy of the GNU Lesser General Public License
# along with BigBlueTutor.  If not, see <http://www.gnu.org/licenses/>.
FROM node:boron
ENV APP_HOME=/usr/src/app/

# App dependences
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev python3 python3-pip
RUN pip3 install rethinkdb python-dotenv
RUN pip3 install --upgrade pip

# Create app directory
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# Install app dependencies
COPY package.json $APP_HOME
RUN npm install

# Bundle app source
ADD . $APP_HOME

EXPOSE 6020
#CMD ["npm start"]
