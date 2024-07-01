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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';

import { ConfigService } from '../config/config.service';
import { environment } from 'src/environments/environment';
// import { InterceptedHttp } from '../../http.interceptor';
// import { SecurityInterceptedHttp } from '../../http.securityinterceptor';

@Injectable()
export class ParkingPlaceMasterService {
  providerAdmin_Base_Url: any;
  common_Base_Url: any;

  getServiceLines_new_url: any;
  getStates_new_url: any;
  _getZonesURL: any;
  getParkingPlacesURL: any;

  // CRUD - parking place master
  saveParkingPlacesURL: any;
  updateParkingPlaceStatusURL: any;
  updateParkingPlaceDetailsURL: any;

  /*Parking place - Sub-District Mapping*/
  _getDistrictListURL: any;
  _getTalukListURL: any;
  filterMappedTaluks_url: any;
  getAllParkingPlaceSubDistrictMapping_url: any;
  saveParkingPlaceSubDistrictMapping_url: any;
  mappingActivationDeactivation_url: any;
  updateTalukMapping_url: any;

  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {
    this.providerAdmin_Base_Url = this.basepaths.getAdminBaseUrl();
    this.common_Base_Url = this.basepaths.getCommonBaseURL();

    /* common serviceline and state */

    this.getServiceLines_new_url =
      this.providerAdmin_Base_Url + 'm/role/serviceNew';
    this.getStates_new_url = this.providerAdmin_Base_Url + 'm/role/stateNew';
    this._getZonesURL = this.providerAdmin_Base_Url + 'zonemaster/get/zones';

    /* parking place master*/

    this.saveParkingPlacesURL =
      this.providerAdmin_Base_Url + 'parkingPlaceMaster/create/parkingPlaces';
    this.getParkingPlacesURL =
      this.providerAdmin_Base_Url +
      'parkingPlaceMaster/get/parkingPlacesbyzoneid';
    this.updateParkingPlaceStatusURL =
      this.providerAdmin_Base_Url + 'parkingPlaceMaster/remove/parkingPlace';
    this.updateParkingPlaceDetailsURL =
      this.providerAdmin_Base_Url +
      'parkingPlaceMaster/update/parkingPlaceDetails';

    /* Parking place- taluk/sub-district mapping services*/

    this.getAllParkingPlaceSubDistrictMapping_url =
      this.providerAdmin_Base_Url +
      '/parkingPlaceTalukMapping/getall/parkingPlacesTalukMapping';
    this._getDistrictListURL =
      this.providerAdmin_Base_Url + '/zonemaster/getdistrictMappedtoZone';
    this._getTalukListURL = this.common_Base_Url + 'location/taluks/';
    this.saveParkingPlaceSubDistrictMapping_url =
      this.providerAdmin_Base_Url +
      '/parkingPlaceTalukMapping/create/parkingPlacesTalukMapping';
    this.mappingActivationDeactivation_url =
      this.providerAdmin_Base_Url +
      '/parkingPlaceTalukMapping/activate/parkingPlacesTalukMapping';
    this.updateTalukMapping_url =
      this.providerAdmin_Base_Url +
      '/parkingPlaceTalukMapping/update/parkingPlacesTalukMapping';
    this.filterMappedTaluks_url =
      this.providerAdmin_Base_Url +
      'parkingPlaceTalukMapping/get/unmappedtaluk';
  }
  /*common services*/
  getServiceLinesNew(userID: any) {
    return this.http.post(environment.getServiceLines_newrole_url, {
      userID: userID,
    });
  }
  getStatesNew(obj: any) {
    return this.http.post(this.getStates_new_url, obj);
  }
  getZones(data: any) {
    return this.http.post(environment._getZonesParkURL, data);
  }
  /* End common services*/

  /* parking place master services*/
  saveParkingPlace(data: any) {
    return this.http.post(environment.saveParkingPlacesURL, data);
  }

  getParkingPlaces(data: any) {
    return this.http.post(environment.getParkingPlacesURL, data);
  }

  updateParkingPlaceStatus(data: any) {
    return this.http.post(environment.updateParkingPlaceStatusURL, data);
  }

  updateParkingPlaceDetails(data: any) {
    return this.http.post(environment.updateParkingPlaceDetailsURL, data);
  }
  /* End parking place master*/

  /* Parking place- taluk/sub-district mapping services*/

  getAllParkingPlaceSubDistrictMapping(mappedReqObj: any) {
    return this.http.post(
      environment.getAllParkingPlaceSubDistrictMapping_url,
      mappedReqObj,
    );
  }
  getDistricts(zoneID: any) {
    return this.http.post(environment._getDistrictListURL, { zoneID: zoneID });
  }
  getTaluks(districtID: any) {
    return this.http.get(environment._getTalukListURL + districtID);
  }
  filterMappedTaluks(unmappedObject: any) {
    return this.http.post(environment.filterMappedTaluks_url, unmappedObject);
  }
  saveParkingPlaceSubDistrictMapping(reqObj: any) {
    return this.http.post(
      environment.saveParkingPlaceSubDistrictMapping_url,
      reqObj,
    );
  }
  updateTalukMapping(updateObj: any) {
    return this.http.post(environment.updateTalukMapping_url, updateObj);
  }
  mappingActivationDeactivation(activateObj: any) {
    return this.http.post(
      environment.mappingActivationDeactivation_url,
      activateObj,
    );
  }
}
