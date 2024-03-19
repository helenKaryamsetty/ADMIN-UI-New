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
import { ConfigService } from '../config/config.service';

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
      this.providerAdmin_Base_Url + '/getDrugStrangth';

    /*Drug Group - Drug Mapping*/

    this.getServiceLines_new_url =
      this.providerAdmin_Base_Url + 'm/role/serviceNew';
    this.getStates_new_url = this.providerAdmin_Base_Url + 'm/role/stateNew';

    /*Drug Group Master*/
    this._getStateListBYServiceIDURL =
      this.providerAdmin_Base_Url + 'm/location/getStatesByServiceID';
  }
  getServiceLinesNew(userID: any) {
    return this.http.post(this.getServiceLines_new_url, { userID: userID });
    // .map(this.handleState_n_ServiceSuccess)
    // .catch(this.handleError);
  }
  getStatesNew(obj: any) {
    return this.http.post(this.getStates_new_url, obj);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  getDrugMappings(data: any) {
    return this.http.post(this.getDrugMappingsURL, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  getDrugGroups(data: any) {
    return this.http.post(this.getDrugGroupsURL, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  getDrugsList(data: any) {
    return this.http.post(this.getDrugsListURL, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  mapDrugGroups(data: any) {
    return this.http.post(this.mapDrugGroupURL, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  /* End Mapping */

  // getAllDrugStrengths() {
  //     return this.httpIntercept.post(this.getAllDrugStrengthsUrl, {})
  //     .map(this.handleSuccess)
  //     .catch(this.handleError);
  // }

  /*Drug Group Master*/
  getStatesByServiceID(serviceID: any, serviceProviderID: any) {
    return this.http.post(this._getStateListBYServiceIDURL, {
      serviceID: serviceID,
      serviceProviderID: serviceProviderID,
    });
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  saveDrugGroups(data: any) {
    return this.http.post(this.saveDrugGroupsURL, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  updateDrugGroup(data: any) {
    return this.http.post(this.updateDrugGroupURL, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  updateDrugStatus(data: any) {
    return this.http.post(this.updateDrugStatusURL, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  /**End Group Matser**/

  /*Drug List*/

  saveDrugs(data: any) {
    return this.http.post(this.saveDrugsURL, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  updateDrugData(data: any) {
    return this.http.post(this.updateDrugDataURL, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  /**End drug list**/

  updateDrugMappings(data: any) {
    return this.http.post(this.updateDrugMappingsURL, data);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  // handleState_n_ServiceSuccess(response: Response) {

  //     console.log(response.json().data, 'role service file success response');
  //     let result = [];
  //     result = response.json().data.filter(function (item) {
  //         if (item.serviceID == 3) {
  //             return item;
  //         }
  //     });
  //     return result;
  // }

  // handleSuccess(res: Response) {
  //     console.log(res.json().data, '--- in drug master SERVICE');
  //     if (res.json().data) {
  //         return res.json().data;
  //     } else {
  //         return Observable.throw(res.json());
  //     }
  // }

  // handleError(error: Response | any) {
  //     return Observable.throw(error.json());

  // }
}
