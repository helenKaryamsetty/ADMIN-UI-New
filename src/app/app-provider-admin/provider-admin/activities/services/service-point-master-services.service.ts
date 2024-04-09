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

@Injectable()
export class ServicePointMasterService {
  updateServicePointsURL: string;
  providerAdmin_Base_Url: any;
  common_Base_Url: any;

  _getStateListURL: any;
  _getServiceLineURL: any;
  _getZonesURL: any;
  getParkingPlacesURL: any;
  _getDistrictListURL: any;
  _getTalukListURL: any;

  // CRUD
  saveServicePointsURL: any;
  getServicePointsURL: any;
  updateServicePointStatusURL: any;

  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {
    this.providerAdmin_Base_Url = this.basepaths.getAdminBaseUrl();
    this.common_Base_Url = this.basepaths.getCommonBaseURL();

    this._getStateListURL = this.providerAdmin_Base_Url + 'm/role/stateNew';
    this._getServiceLineURL = this.providerAdmin_Base_Url + 'm/role/serviceNew';
    this._getZonesURL = this.providerAdmin_Base_Url + 'zonemaster/get/zones';
    this.getParkingPlacesURL =
      this.providerAdmin_Base_Url +
      'parkingPlaceMaster/get/parkingPlacesbyzoneid';
    this._getDistrictListURL =
      this.providerAdmin_Base_Url + '/zonemaster/getdistrictMappedtoZone';
    this._getTalukListURL =
      this.providerAdmin_Base_Url +
      '/parkingPlaceTalukMapping/getbyppidanddid/parkingPlacesTalukMapping';

    this.saveServicePointsURL =
      this.providerAdmin_Base_Url + 'servicePointMaster/create/servicePoints';
    this.getServicePointsURL =
      this.providerAdmin_Base_Url + 'servicePointMaster/get/servicePoints';
    this.updateServicePointStatusURL =
      this.providerAdmin_Base_Url + 'servicePointMaster/remove/servicePoint';
    this.updateServicePointsURL =
      this.providerAdmin_Base_Url + '/servicePointMaster/edit/servicePoint';
  }
  getServices(userID: any) {
    return this.http.post(environment._getServiceLineURL, { userID: userID });
    // .map(this.handleState_n_ServiceSuccess)
    // .catch(this.handleError);
  }

  getStates(userID: any, serviceID: any, isNationalFlag: any) {
    return this.http.post(environment._getStateListURL, {
      userID: userID,
      serviceID: serviceID,
      isNational: isNationalFlag,
    });
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  getZones(data: any) {
    return this.http.post(environment._getZonesURL, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  getParkingPlaces(data: any) {
    return this.http.post(environment.getParkingPlacesURL, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  getDistricts(zoneID: any) {
    return this.http.post(environment._getDistrictZoneListURL, { zoneID: zoneID });
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  getServicePoints(data: any) {
    return this.http.post(environment.getServicePointsURL, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  getTaluks(talukObj: any) {
    return this.http.post(environment._getTalukServiceListURL, talukObj);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  saveServicePoint(data: any) {
    return this.http.post(environment.saveServicePointsURL, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  updateServicePoint(data: any) {
    return this.http.post(environment.updateServicePointsURL, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  updateServicePointStatus(data: any) {
    return this.http.post(environment.updateServicePointStatusURL, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
}
