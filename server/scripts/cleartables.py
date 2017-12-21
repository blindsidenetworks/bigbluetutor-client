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
#Use -d as a command-line argument to drop the tables instead of just clearing their contents

import rethinkdb as r
import dotenv
import os
import sys

dotenv.load_dotenv("./.env")

confirm = input("Are you sure you want to clear the database (y/N)? ").lower()
if(not(confirm == "yes" or confirm == "y")):
    print("Database not cleared")
    sys.exit()

r.connect(os.environ.get("DB_HOST"), int(os.environ.get("DB_PORT"))).repl()
list = r.db("deepstream").table_list().run()
print("Table list:")
print(list)
print()

if(len(sys.argv) > 1 and sys.argv[1] == "-d"):
    for table in list:
        print(r.db("deepstream").table_drop(table).run())
else:
    for table in list:
        print(r.db("deepstream").table(table).delete().run())
