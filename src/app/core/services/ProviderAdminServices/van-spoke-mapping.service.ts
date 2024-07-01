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
export class VanSpokeMappingService {
  providerAdmin_Base_Url: any;
  common_Base_Url: any;
  getServiceLines_new_url: any;
  getStates_new_url: any;
  zonesurl: any;
  parkingPlaceUrl: any;
  servicepointUrl: any;
  vanTypesURL: any;
  van_spoke_Url: any;
  saveUrl: any;
  fetchUrl: any;
  activeMappingStatusUrl: any;
  fetchUnmappedVansurl: any;

  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {
    this.providerAdmin_Base_Url = this.basepaths.getAdminBaseUrl();
    this.common_Base_Url = this.basepaths.getCommonBaseURL();

    this.getServiceLines_new_url =
      this.providerAdmin_Base_Url + 'm/role/serviceNew';
    this.getStates_new_url = this.providerAdmin_Base_Url + 'm/role/stateNew';
    this.zonesurl = this.providerAdmin_Base_Url + 'zonemaster/get/zones';
    this.parkingPlaceUrl =
      this.providerAdmin_Base_Url +
      'parkingPlaceMaster/get/parkingPlacesbyzoneid';
    this.servicepointUrl =
      this.providerAdmin_Base_Url + 'servicePointMaster/get/servicePoints';
    this.vanTypesURL = this.providerAdmin_Base_Url + 'vanMaster/get/vanTypes';
    this.van_spoke_Url =
      this.providerAdmin_Base_Url + 'vanMaster/get/vanDetails';
    this.saveUrl = this.providerAdmin_Base_Url + 'mapping/save/vanSpokeMapping';
    this.fetchUrl = this.providerAdmin_Base_Url + 'mapping/get/vanSpokeMapping';
    this.activeMappingStatusUrl =
      this.providerAdmin_Base_Url + 'mapping/delete/vanSpokeMapping';
    this.fetchUnmappedVansurl = this.providerAdmin_Base_Url + '*';
  }
  getServiceLines(userID: any) {
    return this.http.post(environment.getServiceLines_new_url, {
      userID: userID,
    });
    // .map(this.handleSuccess)
    // .catch(this.handleError)
  }
  getStates(serviceline: any) {
    return this.http.post(environment.getStates_new_url, serviceline);
    // .map(this.handleSuccess)
    // .catch(this.handleError)
  }
  getZones(providerServiceMapID: any) {
    return this.http.post(environment.zonesurl, providerServiceMapID);
    // .map(this.handleSuccess)
    // .catch(this.handleError)
  }
  getParkingPlace(parkingplaceReqObj: any) {
    return this.http.post(environment.parkingPlaceUrl, parkingplaceReqObj);
    // .map(this.handleSuccess)
    // .catch(this.handleError)
  }
  getServicepoints(servicepointObj: any) {
    return this.http.post(environment.servicepointUrl, servicepointObj);
    // .map(this.handleSuccess)
    // .catch(this.handleError)
  }
  getVanTypes(providerServiceMapID: any) {
    return this.http.post(environment.vanTypesURL, providerServiceMapID);
    // .map(this.handleSuccess)
    // .catch(this.handleError)
  }
  getVansOrspoke(reqObj: any) {
    return this.http.post(environment.van_spoke_Url, reqObj);
    // .map(this.handleSuccess)
    // .catch(this.handleError)
  }
  saveMappingData(saveObj: any) {
    return this.http.post(environment.saveMappingUrl, saveObj);
    // .map(this.handleSuccess)
    // .catch(this.handleError)
  }
  getVanSpokeMapping(fetchObj: any) {
    return this.http.post(environment.fetchUrl, fetchObj);
    // .map(this.handleSuccess)
    // .catch(this.handleError)
  }
  updateMappingStatus(activeStatusReqObj: any) {
    return this.http.post(
      environment.activeMappingStatusUrl,
      activeStatusReqObj,
    );
    // .map(this.handleSuccess)
    // .catch(this.handleError)
  }
  fetchUnmappedVansToSpoke(unmappedvansObj: any) {
    return this.http.post(this.fetchUnmappedVansurl, unmappedvansObj);
    // .map(this.handleSuccess)
    // .catch(this.handleError)
  }
}
