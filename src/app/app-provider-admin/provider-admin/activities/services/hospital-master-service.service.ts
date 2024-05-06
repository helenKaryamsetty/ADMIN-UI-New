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
 * Date: 11-10-2017
 * Objective: # A service which would handle the HOSPITAL MASTER services.
 */

@Injectable()
export class HospitalMasterService {
  admin_Base_Url: any;
  common_Base_Url: any;

  get_State_Url: any;
  get_Service_Url: any;
  get_District_Url: any;
  get_Taluk_Url: any;
  get_Village_Url: any;

  get_Institution_Url: any;
  create_Institution_Url: any;
  edit_Institution_Url: any;
  delete_Institution_Url: any;
  file_upload_url: string;

  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {
    this.admin_Base_Url = this.basepaths.getAdminBaseUrl();
    this.common_Base_Url = this.basepaths.getCommonBaseURL();

    this.get_State_Url = this.admin_Base_Url + 'm/role/stateNew';
    this.get_Service_Url = this.admin_Base_Url + 'm/role/serviceNew';
    this.get_District_Url = this.common_Base_Url + 'location/districts/';
    this.get_Taluk_Url = this.common_Base_Url + 'location/taluks/';
    this.get_Village_Url = this.common_Base_Url + 'location/village/';

    this.get_Institution_Url = this.admin_Base_Url + 'm/getInstution';
    this.create_Institution_Url =
      this.admin_Base_Url + 'm/createInstutionByVillage';
    this.edit_Institution_Url = this.admin_Base_Url + 'm/editInstution';
    this.delete_Institution_Url = this.admin_Base_Url + 'm/deleteInstution';
    this.file_upload_url = this.admin_Base_Url + 'm/createInstitutionByFile';
  }

  postFormData(formData: any) {
    /*return this.httpIntercept.post(this.get_Service_Url, {
    'userID': 655
  });*/
    return this.http.post(environment.file_upload_url, formData);
  }
  getServices(userID: any) {
    return this.http.post(environment.get_Service_Url, {
      userID: userID,
    });
  }

  getStates(userID: any, serviceID: any, isNational: any) {
    return this.http.post(environment.get_State_Url, {
      userID: userID,
      serviceID: serviceID,
      isNational: isNational,
    });
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  getDistricts(stateId: any) {
    return this.http.get(environment.get_District_Url + stateId);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  getTaluks(districtId: any) {
    return this.http.get(environment.get_Taluk_Url + districtId);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  getVillages(blockID: any) {
    return this.http.get(environment.get_Village_Url + blockID);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  getInstitutions(data: any) {
    return this.http.post(environment.get_Institution_Url, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  saveInstitution(data: any) {
    return this.http.post(environment.create_Institution_Url, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  editInstitution(data: any) {
    return this.http.post(environment.edit_Institution_Url, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  deleteInstitution(data: any) {
    return this.http.post(environment.delete_Institution_Url, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
}
