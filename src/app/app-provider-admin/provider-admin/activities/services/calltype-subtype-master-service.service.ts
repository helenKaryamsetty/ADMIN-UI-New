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
import { ConfigService } from '../../../../core/services/config/config.service';
import { environment } from 'src/environments/environment';

/**
 * Author: Diamond Khanna ( 352929 )
 * Date: 24-07-2017
 * Objective: # A service which would handle the CRUD of master data in "calltype-subtype" for a provider in its state
 */
@Injectable()
export class CallTypeSubtypeService {
  admin_Base_Url: any;

  get_CallTypeSubType_Url: any;
  save_CallTypeSubType_Url: any;
  delete_SubCallType_Url: any;
  modify_CallTypeSubType_Url: any;

  getServiceLines_new_url: any;
  getStates_new_url: any;

  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {
    this.admin_Base_Url = this.basepaths.getAdminBaseUrl();

    this.get_CallTypeSubType_Url = this.admin_Base_Url + 'm/getCalltypedata';
    this.save_CallTypeSubType_Url =
      this.admin_Base_Url + 'm/createCalltypedata';
    this.delete_SubCallType_Url = this.admin_Base_Url + 'm/deleteCalltype';
    this.modify_CallTypeSubType_Url =
      this.admin_Base_Url + 'm/updateCalltypedata';

    this.getServiceLines_new_url = this.admin_Base_Url + 'm/role/serviceNew';
    this.getStates_new_url = this.admin_Base_Url + 'm/role/stateNew';
  }

  getServiceLinesNew(userID: any) {
    return this.http.post(environment.getServiceLines_new_url, {
      userID: userID,
    });
    // .map(this.handleState_n_ServiceSuccess)
    // .catch(this.handleError);
  }

  getStatesNew(obj: any) {
    return this.http.post(environment.getStates_new_url, obj);
    // .map(this.handleSuccess)
    //   .catch(this.handleError);
  }
  // C.R.U.D

  getCallTypeSubType(serviceProviderMapID: any) {
    return this.http.post(environment.get_CallTypeSubType_Url, {
      providerServiceMapID: serviceProviderMapID,
    });
    // .map(this.handleSuccess)
    //   .catch(this.handleError);
  }

  saveCallTypeSubtype(request_obj: any) {
    return this.http.post(environment.save_CallTypeSubType_Url, request_obj);
    // .map(this.handleSuccess)
    //   .catch(this.handleError);
  }
  deleteSubCallType(obj: any) {
    return this.http.post(environment.delete_SubCallType_Url, obj);
    // .map(this.handleSuccess)
    //   .catch(this.handleError);
  }
  modificallType(obj: any) {
    return this.http.post(environment.modify_CallTypeSubType_Url, obj);
    // .map(this.handleSuccess)
    //   .catch(this.handleError);
  }
}
