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
// import { InterceptedHttp } from '../../http.interceptor';
// import { SecurityInterceptedHttp } from '../../http.securityinterceptor';

import { ConfigService } from '../config/config.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class SeverityTypeService {
  admin_Base_Url: any;
  get_State_Url: any;
  get_State_Url_new: any;
  get_Service_Url_new: any;
  getServicelines_url: any;
  addSeverityUrl: any;
  deleteSeverityUrl: any;
  modifySeverityUrl: any;
  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {
    this.admin_Base_Url = this.basepaths.getAdminBaseUrl();
    this.get_State_Url = this.admin_Base_Url + 'm/getServerity';

    this.get_State_Url_new = this.admin_Base_Url + 'm/role/stateNew';
    this.get_Service_Url_new = this.admin_Base_Url + 'm/role/serviceNew';

    this.addSeverityUrl = this.admin_Base_Url + 'm/saveServerity ';
    this.deleteSeverityUrl = this.admin_Base_Url + 'm/deleteServerity';
    this.modifySeverityUrl = this.admin_Base_Url + 'm/editServerity';
  }

  getStates(userID: any, serviceID: any, isNationalFlag: any) {
    return this.http.post(environment.get_State_Url_new, {
      userID: userID,
      serviceID: serviceID,
      isNational: isNationalFlag,
    });
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  getServices(userID: any) {
    return this.http.post(environment.get_Service_Url_new, { userID: userID });
    // .map(this.handleState_n_ServiceSuccess)
    // .catch(this.handleError);
  }

  getSeverity(providerServiceMapID: any) {
    return this.http.post(environment.get_Serverity_Url, {
      providerServiceMapID: providerServiceMapID,
    });
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  addSeverity(array: any) {
    return this.http.post(environment.addSeverityUrl, array);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  modifySeverity(obj: any) {
    return this.http.post(environment.modifySeverityUrl, obj);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  deleteSeverity(obj: any) {
    return this.http.post(environment.deleteSeverityUrl, obj);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
}
