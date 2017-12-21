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
#Prints the contents of all the tables in a RethinkDB database
#You can also pass the names of specific tables as command-line arguments to print only those tables
#Users' messages are excluded from printing

import rethinkdb as r
import dotenv
import os
import json
import sys

dotenv.load_dotenv("./.env")

r.connect(os.environ.get("DB_HOST"), int(os.environ.get("DB_PORT"))).repl()
tableList = []
if(len(sys.argv) > 1):
    tableList = sys.argv[1:len(sys.argv)]
else:
    tableList = r.db("deepstream").table_list().run()

print("Table list:")
print(tableList)
print()


for table in tableList:
    print("Table name: " + table)
    table = list(r.db("deepstream").table(table).run())
    #.without("messages").run())
    print(json.dumps(table, indent=1, sort_keys=True))
    print()
