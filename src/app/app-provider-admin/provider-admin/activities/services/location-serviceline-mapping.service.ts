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
// import { InterceptedHttp } from '../../http.interceptor';
// import { SecurityInterceptedHttp } from '../../http.securityinterceptor';

@Injectable()
export class LocationServicelineMapping {
  providerAdmin_Base_Url: any;
  getStates_url: any;
  getServiceLines_url: any;

  getStates_new_url: any;
  getServiceLines_new_url: any;

  getDistricts_url: any;
  getWorkLocations_url: any;
  add_WorkLocation_url: any;
  edit_WorkLocation_url: any;
  delete_WorkLocation_url: any;
  getWorkLocationsOnState_url: any;
  getOfficesUrl: any;

  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {
    this.providerAdmin_Base_Url = this.basepaths.getAdminBaseUrl();

    this.getStates_new_url = this.providerAdmin_Base_Url + 'm/role/stateNew';
    this.getServiceLines_new_url =
      this.providerAdmin_Base_Url + 'm/role/serviceNew';

    this.getStates_url = this.providerAdmin_Base_Url + 'm/role/state';
    this.getDistricts_url =
      this.providerAdmin_Base_Url + 'm/location/findDistrict';
    this.getServiceLines_url = this.providerAdmin_Base_Url + 'm/role/service';
    this.getWorkLocations_url =
      this.providerAdmin_Base_Url + 'm/location/getAlllocation';
    this.add_WorkLocation_url =
      this.providerAdmin_Base_Url + 'm/location/addLocation';
    this.edit_WorkLocation_url =
      this.providerAdmin_Base_Url + 'm/location/editLocation';
    this.delete_WorkLocation_url =
      this.providerAdmin_Base_Url + 'm/location/deleteLocation';
    this.getWorkLocationsOnState_url =
      this.providerAdmin_Base_Url + '/m/location/getLocationByStateId';
    this.getOfficesUrl =
      this.providerAdmin_Base_Url + 'm/location/getOfficeNameByMapId';
  }

  getStates(serviceProviderID: any): Observable<any> {
    return this.http.post(environment.getStates_url, {
      serviceProviderID: serviceProviderID,
    });
    // .map(this.handleState_n_ServiceSuccess)
    // .catch(this.handleError);
  }

  getStatesNew(obj: any): Observable<any> {
    return this.http.post(environment.getStates_new_url, obj);
    // .map(this.handleState_n_ServiceSuccess)
    // 	.catch(this.handleError);
  }

  getServiceLinesNew(userID: any): Observable<any> {
    return this.http.post(environment.getServiceLines_new_url, {
      userID: userID,
    });
    // .map(this.handleState_n_ServiceSuccess)
    // .catch(this.handleError);
  }

  getDistricts(serviceProviderID: any, stateID: any): Observable<any> {
    return this.http.post(environment.getDistricts_url, {
      serviceProviderID: serviceProviderID,
      stateID: stateID,
    });
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  getServiceLines(serviceProviderID: any, stateID: any): Observable<any> {
    return this.http.post(environment.getServiceLines_url, {
      serviceProviderID: serviceProviderID,
      stateID: stateID,
    });
    // .map(this.handleState_n_ServiceSuccess)
    // .catch(this.handleError);
  }

  getWorkLocations(reqObj: any): Observable<any> {
    return this.http.post(environment.getWorkLocations_url, reqObj);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  getWorkLocationsOnState(reqObj: any): Observable<any> {
    return this.http.post(environment.getWorkLocationsOnState_url, reqObj);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  addWorkLocation(requestObject: any): Observable<any> {
    return this.http.post(environment.add_WorkLocation_url, requestObject);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  editWorkLocation(requestObject: any): Observable<any> {
    return this.http.post(environment.edit_WorkLocation_url, requestObject);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  deleteWorkLocation(obj: any): Observable<any> {
    return this.http.post(environment.delete_WorkLocation_url, obj);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  getWorklocationOnProviderArray(ProvidepMapIDArray: any): Observable<any> {
    return this.http.post(environment.getOfficesUrl, {
      providerServiceMapID: ProvidepMapIDArray,
    });
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
}
