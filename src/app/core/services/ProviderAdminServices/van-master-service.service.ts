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
import { EnvironmentInjector, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';

import { ConfigService } from '../config/config.service';
import { environment } from 'src/environments/environment';
import { EmailValidator } from '@angular/forms';
// import { InterceptedHttp } from './../../http.interceptor';
// import { SecurityInterceptedHttp } from '../../http.securityinterceptor';

@Injectable()
export class VanMasterService {
  headers = new Headers({ 'Content-Type': 'application/json' });

  providerAdmin_Base_Url: any;
  common_Base_Url: any;

  //CRUD
  saveVansURL: any;
  getVansURL: any;
  updateVanStatusURL: any;
  updateVanURL: any;
  getVanTypesURL: any;
  getParkingPlacesURL: any;

  _getStateListBYServiceIDURL: any;
  _getStateListURL: any;
  _getServiceLineURL: any;
  _getDistrictListURL: any;
  _getTalukListURL: any;
  _getBlockListURL: any;
  _getBranchListURL: any;

  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {
    this.providerAdmin_Base_Url = this.basepaths.getAdminBaseUrl();
    this.common_Base_Url = this.basepaths.getCommonBaseURL();

    this.saveVansURL =
      this.providerAdmin_Base_Url + 'vanMaster/save/vanDetails';
    this.getVansURL = this.providerAdmin_Base_Url + 'vanMaster/get/vanDetails';
    this.updateVanURL =
      this.providerAdmin_Base_Url + 'vanMaster/update/vanDetails';
    this.updateVanStatusURL =
      this.providerAdmin_Base_Url + 'vanMaster/remove/vanDetails';
    this.getVanTypesURL =
      this.providerAdmin_Base_Url + 'vanMaster/get/vanTypes';
    this.getParkingPlacesURL =
      this.providerAdmin_Base_Url + 'parkingPlaceMaster/get/parkingPlaces';

    this._getStateListBYServiceIDURL =
      this.providerAdmin_Base_Url + 'm/location/getStatesByServiceID';
    this._getStateListURL = this.common_Base_Url + 'location/states/';
    this._getServiceLineURL = this.providerAdmin_Base_Url + 'm/role/service';
    this._getDistrictListURL =
      this.providerAdmin_Base_Url + '/zonemaster/getdistrictMappedtoZone';
    this._getTalukListURL =
      this.providerAdmin_Base_Url +
      '/parkingPlaceTalukMapping/getbyppidanddid/parkingPlacesTalukMapping';
    this._getBlockListURL = this.common_Base_Url + 'location/districtblocks/';
    this._getBranchListURL = this.common_Base_Url + 'location/village/';
  }

  saveVan(data: any) {
    return this.http.post(environment.saveVansURL, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  getVans(data: any) {
    return this.http.post(environment.getVansURL, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  updateVanStatus(data: any) {
    return this.http.post(environment.updateVanStatusURL, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  updateVanData(data: any) {
    return this.http.post(environment.updateVanURL, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  getVanTypes() {
    return this.http.post(environment.getVanTypesURL, {});
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  getParkingPlaces(data: any) {
    return this.http.post(environment.getParkingNewPlacesURL, data);
    // .map(this.handleState_n_ServiceSuccess_parking)
    // .catch(this.handleError);
  }

  getStatesByServiceID(serviceID: any, serviceProviderID: any) {
    return this.http.post(environment._getStateListByServiceIDURL, {
      serviceID: serviceID,
      serviceProviderID: serviceProviderID,
    });
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  getStates(serviceProviderID: any) {
    return this.http.post(environment._getStateNewListURL, {
      serviceProviderID: serviceProviderID,
    });
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  getServices(serviceProviderID: any, stateID: any) {
    return this.http.post(environment._getServiceNewLineURL, {
      serviceProviderID: serviceProviderID,
      stateID: stateID,
    });
    // .map(this.handleSuccess)
    //     .catch(this.handleError);
  }

  getDistricts(zoneID: any) {
    return this.http.post(environment._getDistrictListURL, { zoneID: zoneID });
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  getTaluks(talukObj: any) {
    return this.http.post(environment._getTalukNewListURL, talukObj);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  getSTBs(talukId: number) {
    return this.http.get(environment._getBlockListURL + talukId);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  getBranches(blockId: number) {
    return this.http.get(environment._getBranchListURL + blockId);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
}
