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
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
// import { InterceptedHttp } from './../../http.interceptor';
// import { SecurityInterceptedHttp } from '../../http.securityinterceptor';
import { ConfigService } from '../config/config.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class WrapupTimeConfigurationService {
  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {}
  getServiceLines(userID: any) {
    return this.http.post(environment.getServiceLines_new_url, {
      userID: userID,
    });
  }
  getStates(obj: any) {
    return this.http.post(environment.getStates_new_url, obj);
  }
  getActiveRoles(providerServiceMapID: any) {
    return this.http.post(environment.getRolesUrl, {
      providerServiceMapID: providerServiceMapID,
    });
  }
  saveWrapUpTime(roleObj: any) {
    return this.http.post(environment.saveUrl, roleObj);
  }

  handleState_n_ServiceSuccess(response: any) {
    console.log(response.data, 'role service file success response');
    let result = [];
    if (response.data) {
      result = response.data.filter(function (item: any) {
        if (item.serviceID === 3) {
          return item;
        }
      });
      return result;
    }
  }
  //Shubham Shekhar,24-0802021,Wrapup configuaration to be enabled in MCTS and 1097
  getServiceLinesWrapup(userID: any) {
    return this.http.post(environment.getServiceLines_new_url, {
      userID: userID,
    });
  }
  handleState_n_ServiceSuccessWrapup(response: any) {
    console.log(response.data, 'role service file success response');
    let result = [];
    if (response.data) {
      result = response.data.filter(function (item: any) {
        if (
          item.serviceID === 3 ||
          item.serviceID === 6 ||
          item.serviceID === 1
        ) {
          return item;
        }
      });
      return result;
    }
  }
}
