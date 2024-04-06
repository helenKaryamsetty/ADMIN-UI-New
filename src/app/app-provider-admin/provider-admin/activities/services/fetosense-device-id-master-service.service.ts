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
import { ConfigService } from 'src/app/core/services/config/config.service';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
// import { InterceptedHttp } from '../../http.interceptor';
// import { SecurityInterceptedHttp } from '../../http.securityinterceptor';

/**
 * Author: DE40034072
 * Date: 29-06-2021
 * Objective: # A service which would handle the DEVICE ID MASTER services.
 */

@Injectable()
export class FetosenseDeviceIdMasterService {
  adminBaseUrl: any;

  getStateUrl: any;
  getServiceLineUrl: any;

  fetosenseDeviceMasterServiceUrl: any;
  editFetosenseDeviceIdUrl: any;
  deleteFetosenseDeviceMasterUrl: any;
  getFetosenseDeviceMasterUrl: any;
  getSpokeIdAndDeviceIdUrl: any;
  spokeDeviceIdMappingUrl: any;
  getZonesURL: any;
  getParkingPlacesURL: any;
  getVanTypesURL: any;
  getVanDeviceIdMappingsURL: any;
  deleteSpokeDeviceIdMappingUrl: any;
  editSpokeDeviceIdMappingUrl: any;

  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {
    this.adminBaseUrl = this.basepaths.getAdminBaseUrl();

    this.getStateUrl = this.adminBaseUrl + 'm/role/stateNew';
    this.getServiceLineUrl = this.adminBaseUrl + 'm/role/serviceNew';
    /**Device ID Master Urls */
    this.getFetosenseDeviceMasterUrl =
      this.adminBaseUrl + 'fetosense/fetch/fetosenseDeviceID';
    this.fetosenseDeviceMasterServiceUrl =
      this.adminBaseUrl + 'fetosense/createFetosenseDeviceID';
    this.editFetosenseDeviceIdUrl =
      this.adminBaseUrl + 'fetosense/update/fetosenseDeviceID';
    this.deleteFetosenseDeviceMasterUrl =
      this.adminBaseUrl + 'fetosense/delete/fetosenseDeviceID';

    /**Spoke Device ID Mapping Urls */
    this.getSpokeIdAndDeviceIdUrl =
      this.adminBaseUrl + 'fetosense/fetch/vanIDAndFetosenseDeviceID';
    this.spokeDeviceIdMappingUrl =
      this.adminBaseUrl + 'fetosense/mapping/vanIDAndDeviceID';
    this.getZonesURL = this.adminBaseUrl + 'zonemaster/get/zones';
    this.getParkingPlacesURL =
      this.adminBaseUrl + 'parkingPlaceMaster/get/parkingPlacesbyzoneid';
    this.getVanTypesURL = this.adminBaseUrl + 'vanMaster/get/vanTypes';
    this.getVanDeviceIdMappingsURL =
      this.adminBaseUrl + 'fetosense/fetch/mappingWorklist';
    this.deleteSpokeDeviceIdMappingUrl =
      this.adminBaseUrl + 'fetosense/delete/vanIDAndFetosenseDeviceIDMapping';
    this.editSpokeDeviceIdMappingUrl =
      this.adminBaseUrl + 'fetosense/update/vanIDAndFetosenseDeviceIDMapping';
  }

  getServiceLines(userID: any) {
    return this.http.post(this.getServiceLineUrl, { userID: userID });
    // .map(response => response.json());
  }

  getStates(userID: any, serviceID: any, isNationalFlag: any) {
    return this.http.post(this.getStateUrl, {
      userID: userID,
      serviceID: serviceID,
      isNational: isNationalFlag,
    });
    // .map(response => response.json());
  }

  /**Device ID Master screen Api's */

  getFetosenseDeviceMaster(providerServiceMapID: any) {
    return this.http.post(this.getFetosenseDeviceMasterUrl, {
      providerServiceMapID: providerServiceMapID,
    });
    // .map(response => response.json());
  }

  toggle_activate_DeviceMaster(data: any) {
    return this.http.post(this.deleteFetosenseDeviceMasterUrl, data);
    // .map(response => response.json());
  }

  saveFetosenseDeviceMaster(data: any) {
    return this.http.post(this.fetosenseDeviceMasterServiceUrl, data);
    // .map(response => response.json());
  }

  editFetosenseDeviceMaster(data: any) {
    return this.http.post(this.editFetosenseDeviceIdUrl, data);
    // .map(response => response.json());
  }

  /**END */

  /**Spoke Device ID Mapping screen Api's */

  toggle_activate_SpokeDeviceIdMapping(data: any) {
    return this.http.post(this.deleteSpokeDeviceIdMappingUrl, data);
    // .map(response => response.json());
  }

  saveSpokeDeviceIdMapping(data: any) {
    return this.http.post(this.spokeDeviceIdMappingUrl, data);
    //  .map(response => response.json());
  }

  editSpokeDeviceIdMapping(data: any) {
    return this.http.post(this.editSpokeDeviceIdMappingUrl, data);
    // .map(response => response.json());
  }

  getSpokeIdAndDeviceId(data: any) {
    return this.http.post(this.getSpokeIdAndDeviceIdUrl, data);
    // .map(response => response.json());
  }

  getZones(data: any) {
    return this.http.post(this.getZonesURL, data);
    // .map(response => response.json());
  }

  getParkingPlaces(data: any) {
    return this.http.post(this.getParkingPlacesURL, data);
    // .map(response => response.json());
  }

  getVanTypes(data: any) {
    return this.http.post(this.getVanTypesURL, data);
    // .map(response => response.json());
  }

  getVanDeviceIdMappings(data: any) {
    return this.http.post(this.getVanDeviceIdMappingsURL, data);
    // .map(response => response.json());
  }

  /**END */
}
