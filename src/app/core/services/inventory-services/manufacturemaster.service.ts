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
import { ConfigService } from '../config/config.service';
import { environment } from 'src/environments/environment';
// import { InterceptedHttp } from './../../http.interceptor';
// import { SecurityInterceptedHttp } from '../../http.securityinterceptor';

@Injectable()
export class ManufacturemasterService {
  admin_Base_Url: any;
  common_Base_Url: any;
  get_manufacture_Url: any;
  save_manufacture_Url: any;
  update_manufacture_Url: any;
  delete_manufacture_Url: any;
  getAll_Districts_Url: any;
  getAll_State_Url: any;
  getAll_Country: any;

  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {
    this.admin_Base_Url = this.basepaths.getAdminBaseUrl();
    this.common_Base_Url = this.basepaths.getCommonBaseURL();
    this.get_manufacture_Url = this.admin_Base_Url + 'getManufacturer';
    this.save_manufacture_Url = this.admin_Base_Url + 'createManufacturer';
    this.update_manufacture_Url = this.admin_Base_Url + 'editManufacturer';
    this.delete_manufacture_Url = this.admin_Base_Url + 'deleteManufacturer';
    this.getAll_Districts_Url = this.common_Base_Url + 'location/districts/';
    this.getAll_State_Url = this.common_Base_Url + 'location/states/';
    this.getAll_Country = this.common_Base_Url + 'location/getCountries';
  }

  getAllManufacture(providerServiceMapID: any) {
    return this.http.post(environment.get_manufacture_Url, {
      providerServiceMapID: providerServiceMapID,
    });
    // .map(this.handleSuccess)
    //     .catch(this.handleError);
  }

  saveManufacture(obj: any) {
    return this.http.post(environment.save_manufacture_Url, obj);
    // .map(this.handleSuccess)
    //     .catch(this.handleError);
  }
  updateManufacture(obj: any) {
    return this.http.post(environment.update_manufacture_Url, obj);
    // .map(this.handleSuccess)
    //     .catch(this.handleError);
  }
  deleteManufacture(obj: any) {
    return this.http.post(environment.delete_manufacture_Url, obj);
    // .map(this.handleSuccess)
    //     .catch(this.handleError);
  }
  getAllDistricts(stateID: any) {
    return this.http.get(environment.getAll_Districts_Url + stateID);
    // .map(this.handleSuccess)
    // .catch(this.handleError)
  }
  getAllStates(countryID: any) {
    return this.http.get(environment.getAll_State_Url + countryID);
    // .map(this.handleSuccess)
    // .catch(this.handleError)
  }
  getAllCountry() {
    return this.http.get(environment.getAll_Country);
    // .map(this.handleSuccess)
    // .catch(this.handleError)
  }
  checkForUniqueManufacturerCode(
    manufacturerCode: any,
    providerServiceMapID: any,
  ) {
    const checkUrl = this.admin_Base_Url + 'checkManufacturerCode';
    return this.http.post(checkUrl, { manufacturerCode, providerServiceMapID });
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
}
