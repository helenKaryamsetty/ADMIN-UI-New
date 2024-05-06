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
// import { InterceptedHttp } from '../../http.interceptor';
// import { SecurityInterceptedHttp } from '../../http.securityinterceptor';

@Injectable()
export class NatureOfCompaintCategoryMappingService {
  providerAdmin_Base_Url: any;
  getServiceLines_url: any;
  getStates_url: any;
  getFeedbackTypes_Url: any;
  getFeedbackNatureTypes_url: any;
  getMapping_url: any;
  getCategory_url: any;
  saveComplaintToCategoryMapping_url: any;
  updateComplaintCategoryMapping_url: any;
  unmapCategory_url: any;
  filterMappedCategory_url: any;

  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {
    this.providerAdmin_Base_Url = this.basepaths.getAdminBaseUrl();
    this.getServiceLines_url =
      this.providerAdmin_Base_Url + 'm/role/serviceNew';
    this.getStates_url = this.providerAdmin_Base_Url + 'm/role/stateNew';
    this.getFeedbackTypes_Url =
      this.providerAdmin_Base_Url + 'm/getFeedbackType';
    this.getFeedbackNatureTypes_url =
      this.providerAdmin_Base_Url + 'm/getFeedbackNatureType';
    this.getMapping_url =
      this.providerAdmin_Base_Url +
      'm/getmapedCategorytoFeedbackNatureWithFeedbackNatureID';
    this.getCategory_url = this.providerAdmin_Base_Url + 'm/getCategoryByMapID';
    this.saveComplaintToCategoryMapping_url =
      this.providerAdmin_Base_Url + 'm/mapCategorytoFeedbackNature';
    this.updateComplaintCategoryMapping_url =
      this.providerAdmin_Base_Url + 'm/updateCategorytoFeedbackNature';
    this.unmapCategory_url =
      this.providerAdmin_Base_Url + 't/unmappCategoryforFeedbackNature';
    this.filterMappedCategory_url =
      this.providerAdmin_Base_Url + 'm/getunmappedCategoryforFeedbackNature';
  }
  getServiceLines(userID: any): Observable<any> {
    return this.http.post(environment.getServiceLines_url, { userID: userID });
    // .map(this.handleState_n_ServiceSuccess)
    // .catch(this.handleError);
  }
  getStates(obj: any) {
    return this.http.post(environment.getStates_url, obj);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  getFeedbackTypes(providerServiceMapID: any) {
    return this.http.post(environment.getFeedbackTypes_Url, {
      providerServiceMapID: providerServiceMapID,
    });
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  getFeedbackNatureTypes(natureObject: any) {
    return this.http.post(environment.getFeedbackNatureTypes_url, natureObject);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  getMapping(reqObj: any) {
    return this.http.post(environment.getMapping_url, reqObj);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  getAllCategory(providerServiceMapID: any) {
    return this.http.post(environment.getCategoryID_url, {
      providerServiceMapID: providerServiceMapID,
    });
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  unmapCategory(unmapObj: any) {
    return this.http.post(environment.unmapCategory_url, unmapObj);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  filterMappedCategory(providerServiceMapID: any) {
    return this.http.post(environment.filterMappedCategory_url, {
      providerServiceMapID: providerServiceMapID,
    });
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  saveComplaintToCategoryMapping(mappingObj: any) {
    return this.http.post(
      environment.saveComplaintToCategoryMapping_url,
      mappingObj,
    );
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  updateComplaintCategoryMapping(updateObj: any) {
    return this.http.post(
      environment.updateComplaintCategoryMapping_url,
      updateObj,
    );
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
}
