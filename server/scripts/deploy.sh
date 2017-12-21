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
#!/usr/bin/env bash

STATUS="Status: Downloaded newer image for blindsidenetwks/bigbluetutor-server:latest"

new_status=$(sudo docker pull blindsidenetwks/bigbluetutor-server:latest | grep Status:)

echo $new_status

if [ "$STATUS" == "$new_status" ]
then
  cd /home/ubuntu/bigbluetutor-server
  sudo docker-compose -f docker-compose-production.yml down
  #sudo docker-compose -f docker-compose-production.yml run --rm app npm run db:migrate
  #docker rmi $(docker images -f dangling=true -q)
  #sudo docker-compose -f docker-compose-production.yml run --rm app npm run db:cleartables
  sudo docker-compose -f docker-compose-production.yml up -d
fi
