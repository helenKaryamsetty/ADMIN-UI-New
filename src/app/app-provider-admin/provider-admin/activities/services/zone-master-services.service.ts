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
// import { InterceptedHttp } from './../../http.interceptor';
// import { SecurityInterceptedHttp } from '../../http.securityinterceptor';

@Injectable()
export class ZoneMasterService {
  headers = new Headers({ 'Content-Type': 'application/json' });

  providerAdmin_Base_Url: any;
  common_Base_Url: any;

  //CRUD
  saveZonesURL: any;
  getZonesURL: any;

  saveZoneDistrictMappingURL: any;
  getZoneDistrictMappingURL: any;

  _getStateListByServiceIDURL: any;
  _getStateListURL: any;
  _getDistrictListURL: any;
  _getTalukListURL: any;
  _getBlockListURL: any;
  _getBranchListURL: any;
  _getServiceLinesURL: any;

  getServiceLines_new_url: any;
  getStates_new_url: any;

  updateZOneStatusURL: any;
  updateZOneDistrictMappingURL: any;
  updateZoneDataURL: any;
  updateZoneMappingDataUrl: any;

  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {
    this.providerAdmin_Base_Url = this.basepaths.getAdminBaseUrl();
    this.common_Base_Url = this.basepaths.getCommonBaseURL();

    //this.providerAdmin_Base_Url = "http://localhost:9000/";
    this.saveZonesURL = this.providerAdmin_Base_Url + 'zonemaster/save/zone';
    this.getZonesURL = this.providerAdmin_Base_Url + 'zonemaster/get/zones';

    this.saveZoneDistrictMappingURL =
      this.providerAdmin_Base_Url + 'zonemaster/save/zoneDistrictMapping';
    this.getZoneDistrictMappingURL =
      this.providerAdmin_Base_Url + 'zonemaster/get/zoneDistrictMappings';

    this.updateZOneStatusURL =
      this.providerAdmin_Base_Url + 'zonemaster/remove/zone';
    this.updateZOneDistrictMappingURL =
      this.providerAdmin_Base_Url + 'zonemaster/remove/zoneDistrictMapping';

    this.updateZoneDataURL =
      this.providerAdmin_Base_Url + 'zonemaster/update/zoneData';

    this._getStateListByServiceIDURL =
      this.providerAdmin_Base_Url + 'm/location/getStatesByServiceID';
    this._getStateListURL = this.common_Base_Url + 'location/states/';
    this._getDistrictListURL = this.common_Base_Url + 'location/districts/';
    this._getTalukListURL = this.common_Base_Url + 'location/taluks/';
    this._getBlockListURL = this.common_Base_Url + 'location/districtblocks/';
    this._getBranchListURL = this.common_Base_Url + 'location/village/';
    this._getServiceLinesURL = this.providerAdmin_Base_Url + 'getServiceline';

    /* serviceline and state */

    this.getServiceLines_new_url =
      this.providerAdmin_Base_Url + 'm/role/serviceNew';
    this.getStates_new_url = this.providerAdmin_Base_Url + 'm/role/stateNew';
    this.updateZoneMappingDataUrl =
      this.providerAdmin_Base_Url + '/zonemaster/edit/zoneDistrictMapping';
  }

  saveZones(data: any) {
    return this.http.post(environment.saveZonesURL, data);
  }

  getZones(data: any) {
    return this.http.post(environment.getZonesURL, data);
  }

  saveZoneDistrictMappings(data: any) {
    return this.http.post(environment.saveZoneDistrictMappingURL, data);
  }

  getZoneDistrictMappings(data: any) {
    return this.http.post(environment.getZoneDistrictMappingURL, data);
  }

  updateZoneStatus(data: any) {
    return this.http.post(environment.updateZOneStatusURL, data);
  }
  updateZoneMappingData(data: any) {
    return this.http.post(environment.updateZoneMappingDataUrl, data);
  }
  updateZoneMappingStatus(data: any) {
    return this.http.post(environment.updateZOneDistrictMappingURL, data);
  }

  updateZoneData(data: any) {
    return this.http.post(environment.updateZoneDataURL, data);
  }
  getServiceLinesNew(userID: any) {
    return this.http.post(environment.getServiceLines_new_url, {
      userID: userID,
    });
    // .map(this.handleState_n_ServiceSuccess)
    // .catch(this.handleError);
  }
  getStatesNew(obj: any) {
    return this.http.post(environment.getStateszone_new_url, obj);
  }
  getDistricts(stateId: number) {
    return this.http.get(environment.getDistrictZoneListURL + stateId);
  }
  getTaluks(districtId: number) {
    return this.http.get(environment.getTalukZoneListURL + districtId);
  }
  getSTBs(talukId: number) {
    return this.http.get(environment._getBlockListURL + talukId);
  }

  getBranches(blockId: number) {
    return this.http.get(environment._getBranchListURL + blockId);
  }
}
