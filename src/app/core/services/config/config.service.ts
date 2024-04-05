/*
 * AMRIT – Accessible Medical Records via Integrated Technology
 * Integrated EHR (Electronic Health Records) Solution
 *
 * Copyright (C) "Piramal Swasthya Management and Research Institute"
 *
 * This file is part of AMRIT.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see https://www.gnu.org/licenses/.
 */
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

// import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';

const adminIP = environment.adminBaseUrl;
const commonIP = environment.commonBaseURL;

@Injectable()
export class ConfigService {
  private adminBaseUrl = adminIP;
  private superadminBaseURL = adminIP;
  private _commonBaseURL = commonIP;

  getCommonBaseURL() {
    return this._commonBaseURL;
  }
  getAdminBaseUrl() {
    return this.adminBaseUrl;
  }
  getSuperAdminBaseUrl() {
    return this.superadminBaseURL;
  }
}
