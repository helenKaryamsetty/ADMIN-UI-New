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
export class DrugMasterService {
  providerAdmin_Base_Url: any;

  // CRUD

  /*Drug Group - Drug Mapping*/
  getServiceLines_new_url: any;
  getStates_new_url: any;

  saveDrugGroupsURL: any;
  saveDrugsURL: any;
  mapDrugGroupURL: any;

  getDrugsListURL: any;
  getDrugGroupsURL: any;
  getDrugMappingsURL: any;
  getAllDrugStrengthsUrl: any;

  updateDrugStatusURL: any;

  updateDrugDataURL: any;
  updateDrugGroupURL: any;
  updateDrugMappingsURL: any;

  /*Drug Group Master*/
  _getStateListBYServiceIDURL: any;

  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {
    this.providerAdmin_Base_Url = this.basepaths.getAdminBaseUrl();
    this.saveDrugGroupsURL = this.providerAdmin_Base_Url + 'm/saveDrugGroup';
    this.saveDrugsURL = this.providerAdmin_Base_Url + 'm/saveDrug';
    this.mapDrugGroupURL = this.providerAdmin_Base_Url + 'm/mapDrugWithGroup';
    this.getDrugsListURL = this.providerAdmin_Base_Url + 'm/getDrugData';
    this.getDrugGroupsURL = this.providerAdmin_Base_Url + 'm/getDrugGroups';
    this.updateDrugStatusURL =
      this.providerAdmin_Base_Url + 'm/updateDrugStatus';
    this.updateDrugDataURL = this.providerAdmin_Base_Url + 'm/updateDrugMaster';
    this.updateDrugGroupURL = this.providerAdmin_Base_Url + 'm/updateDrugGroup';
    this.getDrugMappingsURL =
      this.providerAdmin_Base_Url + 'm/getDrugGroupMappings';
    this.updateDrugMappingsURL =
      this.providerAdmin_Base_Url + 'm/updateDrugMapping';
    this.getAllDrugStrengthsUrl =
      this.providerAdmin_Base_Url + 'getDrugStrangth';

    /*Drug Group - Drug Mapping*/

    this.getServiceLines_new_url =
      this.providerAdmin_Base_Url + 'm/role/serviceNew';
    this.getStates_new_url = this.providerAdmin_Base_Url + 'm/role/stateNew';

    /*Drug Group Master*/
    this._getStateListBYServiceIDURL =
      this.providerAdmin_Base_Url + 'm/location/getStatesByServiceID';
  }

  getServiceLinesNew(userID: any) {
    return this.http.post(environment.getServiceLines_new_url, {
      userID: userID,
    });
  }

  getStatesNew(obj: any) {
    return this.http.post(environment.getStates_new_url, obj);
  }

  getDrugMappings(data: any) {
    return this.http.post(environment.getDrugMappingsURL, data);
  }

  getDrugGroups(data: any) {
    return this.http.post(environment.getDrugGroupsURL, data);
  }

  getDrugsList(data: any) {
    return this.http.post(environment.getDrugsListURL, data);
  }

  mapDrugGroups(data: any) {
    return this.http.post(environment.mapDrugGroupURL, data);
  }

  /* End Mapping */

  /*Drug Group Master*/
  getStatesByServiceID(serviceID: any, serviceProviderID: any) {
    return this.http.post(environment._getStateListByServiceIDURL, {
      serviceID: serviceID,
      serviceProviderID: serviceProviderID,
    });
  }

  saveDrugGroups(data: any) {
    return this.http.post(environment.saveDrugGroupsURL, data);
  }

  updateDrugGroup(data: any) {
    return this.http.post(environment.updateDrugGroupURL, data);
  }

  updateDrugStatus(data: any) {
    return this.http.post(environment.updateDrugStatusURL, data);
  }
  /**End Group Matser**/

  /*Drug List*/

  saveDrugs(data: any) {
    return this.http.post(environment.saveDrugsURL, data);
  }

  updateDrugData(data: any) {
    return this.http.post(environment.updateDrugDataURL, data);
  }
  /**End drug list**/

  updateDrugMappings(data: any) {
    return this.http.post(environment.updateDrugMappingsURL, data);
  }
}
