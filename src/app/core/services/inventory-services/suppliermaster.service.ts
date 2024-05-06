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
import { ConfigService } from '../config/config.service';
import { environment } from 'src/environments/environment';
// import { InterceptedHttp } from './../../http.interceptor';
// import { SecurityInterceptedHttp } from '../../http.securityinterceptor';

@Injectable()
export class SuppliermasterService {
  admin_Base_Url: any;
  common_Base_Url: any;
  get_State_Url: any;
  get_Service_Url: any;
  get_supplier_Url: any;
  getAll_Districts_Url: any;
  delete_supplier_Url: any;
  save_supplier_Url: any;
  update_supplier_Url: any;
  getAll_State_Url: any;
  getAll_Country: any;

  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {
    this.admin_Base_Url = this.basepaths.getAdminBaseUrl();
    this.common_Base_Url = this.basepaths.getCommonBaseURL();
    this.get_State_Url = this.admin_Base_Url + 'm/role/stateNew';
    this.get_Service_Url = this.admin_Base_Url + 'm/role/serviceNew';
    this.get_supplier_Url = this.admin_Base_Url + 'getSupplier';
    this.getAll_Districts_Url = this.common_Base_Url + 'location/districts/';
    this.delete_supplier_Url = this.admin_Base_Url + 'deleteSupplier';
    this.save_supplier_Url = this.admin_Base_Url + 'createSupplier';
    this.update_supplier_Url = this.admin_Base_Url + 'editSupplier';
    this.getAll_State_Url = this.common_Base_Url + 'location/states/';
    this.getAll_Country = this.common_Base_Url + 'location/getCountries';
  }
  getServices(userID: any) {
    return this.http.post(environment.get_Service_Url, {
      userID: userID,
    });
    // .map(this.handleState_n_ServiceSuccess)
    // .catch(this.handleError);
  }
  getStates(userID: any, serviceID: any, isNational: any) {
    return this.http.post(environment.get_State_Url, {
      userID: userID,
      serviceID: serviceID,
      isNational: isNational,
    });
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  getAllSuppliers(providerServiceMapID: any) {
    return this.http.post(environment.get_supplier_Url, {
      providerServiceMapID: providerServiceMapID,
    });
    // .map(this.handleSuccess)
    //     .catch(this.handleError);
  }
  getAllDistricts(stateID: any) {
    return this.http.get(environment.getAll_Districts_Url + stateID);
    // .map(this.handleSuccess)
    // .catch(this.handleError)
  }
  getAllStates() {
    return this.http.get(environment.getAll_State_Url + 1);
    // .map(this.handleSuccess)
    // .catch(this.handleError)
  }
  getAllCountry() {
    return this.http.get(environment.getAll_Country);
    // .map(this.handleSuccess)
    // .catch(this.handleError)
  }
  deleteSupplier(deleteObj: any) {
    return this.http.post(environment.delete_supplier_Url, deleteObj);
    // .map(this.handleSuccess)
    //     .catch(this.handleError);
  }
  saveSupplier(obj: any) {
    return this.http.post(environment.save_supplier_Url, obj);
    // .map(this.handleSuccess)
    //     .catch(this.handleError);
  }
  updateSupplier(obj: any) {
    return this.http.post(environment.update_supplier_Url, obj);
    // .map(this.handleSuccess)
    //     .catch(this.handleError);
  }

  checkForUniqueSupplierCode(supplierCode: any, providerServiceMapID: any) {
    const checkUrl = this.admin_Base_Url + 'checkSupplierCode';
    return this.http.post(checkUrl, { supplierCode, providerServiceMapID });
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
}
