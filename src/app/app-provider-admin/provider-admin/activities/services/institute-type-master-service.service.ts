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
import { ConfigService } from 'src/app/core/services/config/config.service';
import { environment } from 'src/environments/environment';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
// import { InterceptedHttp } from '../../http.interceptor';
// import { SecurityInterceptedHttp } from '../../http.securityinterceptor';

/**
 * Author: Diamond Khanna ( 352929 )
 * Date: 09-10-2017
 * Objective: # A service which would handle the INSTITUTE TYPE MASTER services.
 */

@Injectable()
export class InstituteTypeMasterService {
  admin_Base_Url: any;

  get_State_Url: any;
  get_Service_Url: any;

  get_InstituteType_Url: any;
  save_InstituteType_Url: any;
  edit_InstituteType_Url: any;
  delete_InstituteType_Url: any;
  get_InstitutesType_Url: any;

  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {
    this.admin_Base_Url = this.basepaths.getAdminBaseUrl();

    this.get_State_Url = this.admin_Base_Url + 'm/role/stateNew';
    this.get_Service_Url = this.admin_Base_Url + 'm/role/serviceNew';

    this.get_InstitutesType_Url = this.admin_Base_Url + 'm/getInstituteType';
    this.save_InstituteType_Url = this.admin_Base_Url + 'm/createInstituteType';
    this.edit_InstituteType_Url = this.admin_Base_Url + 'm/editInstituteType';
    this.delete_InstituteType_Url =
      this.admin_Base_Url + 'm/deleteInstituteType';
  }

  getServices(userID: any) {
    return this.http.post(environment.get_Service_Url, { userID: userID });
    // .map(this.handleState_n_ServiceSuccess)
    // .catch(this.handleError);
  }

  getServicesForInstTypeMaster(userID: any) {
    return this.http.post(environment.get_Service_Url, { userID: userID });
    // .map(this.handleState_t_ServiceSuccess)
    // .catch(this.handleError);
  }

  getStates(userID: any, serviceID: any, isNationalFlag: any) {
    return this.http.post(environment.getStates_new_url, {
      userID: userID,
      serviceID: serviceID,
      isNational: isNationalFlag,
    });
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  getInstitutesType(providerServiceMapID: any) {
    return this.http.post(environment.get_InstitutesType_Url, {
      providerServiceMapID: providerServiceMapID,
    });
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  toggle_activate_InstituteType(data: any) {
    return this.http.post(environment.delete_InstituteType_Url, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  saveInstituteType(data: any) {
    return this.http.post(environment.save_InstituteType_Url, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  editInstituteType(data: any) {
    return this.http.post(environment.edit_InstituteType_Url, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
}
