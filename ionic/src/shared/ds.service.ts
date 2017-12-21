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
import { Injectable } from '@angular/core';
import * as deepstream from 'deepstream.io-client-js';
import { ENV } from '../config/env';

@Injectable()
export class DsService {

  private ds;
  public dsInstance;
  public profileRecord;
  public dataRecord;

  constructor() {
  }

  login (credentials?, loginHandler?) {
    if(this.ds)
      this.ds.close();
    //this code is moved here to prevent the login timeouts
    this.ds = this.dsInstance = deepstream(ENV.server)
      .on('error', error => console.log(error));
    this.ds.login(credentials, loginHandler);
  }

  getRecord(name) {
    return this.ds.record.getRecord(name);
  }

  getList(name) {
    return this.ds.record.getList(name);
  }
}
