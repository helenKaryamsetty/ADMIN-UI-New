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
// import { InterceptedHttp } from './../../http.interceptor';
// import { SecurityInterceptedHttp } from '../../http.securityinterceptor';

/**
 * Author: Diamond Khanna ( 352929 )
 * Date: 10-09-2017
 * Objective: # A service which would handle the mapping of category n subcategory
	 for a subservice of a state,for a service provider
*/

@Injectable()
export class CategorySubcategoryService {
  providerAdmin_Base_Url: any;

  get_sub_serviceID_url: any;
  get_category_subcategory_url: any;
  getSubService_url: any;
  getCategoryBySubService_url: any;
  saveCategory_url: any;
  deleteCategory_url: any;
  deleteSubCategory_url: any;
  getCategory_url: any;
  saveExistCategory_url: any;
  editCategory_url: any;
  editSubCategory_url: any;

  getServiceLines_new_url: any;
  getStates_new_url: any;

  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {
    this.providerAdmin_Base_Url = this.basepaths.getAdminBaseUrl();

    this.getSubService_url = this.providerAdmin_Base_Url + 'm/getSubSerive';
    this.getCategoryBySubService_url =
      this.providerAdmin_Base_Url + 'm/getCategoryBySubServiceID';
    this.saveCategory_url = this.providerAdmin_Base_Url + 'm/createCategory';
    this.deleteCategory_url = this.providerAdmin_Base_Url + 'm/deleteCategory1';
    this.deleteSubCategory_url =
      this.providerAdmin_Base_Url + 'm/deleteSubCategory';
    this.getCategory_url = this.providerAdmin_Base_Url + 'm/getCategory';
    this.saveExistCategory_url =
      this.providerAdmin_Base_Url + 'm/createSubCategory';
    this.editCategory_url = this.providerAdmin_Base_Url + 'm/updateCategory';
    this.editSubCategory_url =
      this.providerAdmin_Base_Url + 'm/updateSubCategory';
    this.getServiceLines_new_url =
      this.providerAdmin_Base_Url + 'm/role/serviceNew';
    this.getStates_new_url = this.providerAdmin_Base_Url + 'm/role/stateNew';
  }

  getStatesNew(obj: any) {
    return this.http.post(this.getStates_new_url, obj);
    // .map(this.handleSuccess)
    //   .catch(this.handleError);
  }

  getServiceLinesNew(userID: any) {
    return this.http.post(this.getServiceLines_new_url, { userID: userID });
    // .map(this.handleState_n_ServiceSuccess)
    // .catch(this.handleError);
  }

  getSubService(serviceProviderMapID: any) {
    return this.http.post(this.getSubService_url, {
      providerServiceMapID: serviceProviderMapID,
    });
    // .map(this.handleState_n_subservice)
    // .catch(this.handleError);
  }

  getCategorybySubService(serviceProviderMapID: any, subServiceID: any) {
    return this.http.post(this.getCategoryBySubService_url, {
      providerServiceMapID: serviceProviderMapID,
      subServiceID: subServiceID,
    });
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  saveCategory(categoryObj: any) {
    return this.http.post(this.saveCategory_url, categoryObj);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  saveSubCategory(categoryObj: any) {
    return this.http.post(this.saveExistCategory_url, categoryObj);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  getCategory(serviceProviderMapID: any, id: any) {
    return this.http.post(this.getCategory_url, {
      providerServiceMapID: serviceProviderMapID,
      subServiceID: id,
    });
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  deleteCategory(id: any, isActivate: boolean) {
    return this.http.post(this.deleteCategory_url, {
      categoryID: id,
      deleted: isActivate,
    });
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  deleteSubCategory(id: any, isActivate: any) {
    return this.http.post(this.deleteSubCategory_url, {
      subCategoryID: id,
      deleted: isActivate,
    });
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  editCategory(catObj: any) {
    return this.http.post(this.editCategory_url, catObj);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  editSubCategory(subCatObj: any) {
    return this.http.post(this.editSubCategory_url, subCatObj);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  // handleState_n_ServiceSuccess(response: Response) {

  //   console.log(response.json().data, 'role service file success response');
  //   let result = [];
  //   result = response.json().data.filter(function (item) {
  //     if (item.serviceID === 3 || item.serviceID === 1 || item.serviceID === 6) {
  //       return item;
  //     }
  //   });
  //   return result;
  // }

  // handleSuccess(res: Response) {
  //   console.log(res.json().data, '--- in location-serviceline-mapping service');
  //   if (res.json().data) {
  //     return res.json().data;
  //   } else {
  //     return Observable.throw(res.json());
  //   }
  // }
  // handleState_n_subservice(response: Response) {

  //   console.log(response.json().data, 'sub service file success response');
  //   let result = [];
  //   result = response.json().data.filter(function (item) {
  //     if (item.deleted === false) {
  //       return item;
  //     }
  //   });
  //   return result;
  // }

  // handleError(error: Response | any) {
  //   return Observable.throw(error.json());
  // }
}
