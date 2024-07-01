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
import { ConfigService } from '../config/config.service';
// import { InterceptedHttp } from '../../http.interceptor';
// import { SecurityInterceptedHttp } from '../../http.securityinterceptor';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';

@Injectable()
export class ComponentMasterServiceService {
  providerAdmin_Base_Url: any;
  common_Base_Url: any;

  _getComponentListURL: any;
  _getCurrentComponentURL: any;
  _postComponentURL: any;
  _updateComponentURL: any;
  _toggleComponentURL: any;
  _iotComponentURL: any;
  getLOINCRecord: any;
  // diagnosisSnomedCTRecordUrl: string;

  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {
    this.providerAdmin_Base_Url = this.basepaths.getAdminBaseUrl();
    this.common_Base_Url = this.basepaths.getCommonBaseURL();
    this._postComponentURL =
      this.providerAdmin_Base_Url + 'labModule/createComponentMaster';
    this._updateComponentURL =
      this.providerAdmin_Base_Url + 'labModule/updateComponentMaster ';
    this._getComponentListURL =
      this.providerAdmin_Base_Url + 'labModule/fetchComponentMaster/';
    this._getCurrentComponentURL =
      this.providerAdmin_Base_Url +
      'labModule/fetchComponentDetailsForComponentID/';
    this._toggleComponentURL =
      this.providerAdmin_Base_Url + 'labModule/updateComponentStatus';
    this._iotComponentURL =
      this.providerAdmin_Base_Url +
      'diagnostics/getDiagnosticProcedureComponent';
    this.getLOINCRecord = this.common_Base_Url + 'lonic/getlonicRecordList';
    // this.diagnosisSnomedCTRecordUrl = `http://10.208.122.38:8080/tmapi-v1.0/snomed/getSnomedCTRecordList`;
  }

  getCurrentComponents(providerServiceMapID: any) {
    return this.http.get(
      `${environment._getComponentListURL}${providerServiceMapID}`,
    );
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
  postComponentData(reqObject: any) {
    // console.log(JSON.stringify(reqObject, null, 4))
    // return Observable.of(reqObject);
    return this.http.post(environment._postComponentURL, reqObject);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  getCurrentComponentForEdit(componentID: any) {
    return this.http.get(
      `${environment._getCurrentComponentURL}${componentID}`,
    );
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  updateComponentData(reqObject: any) {
    return this.http.post(environment._updateComponentURL, reqObject);
  }

  toggleComponent(reqObject: any) {
    return this.http.post(environment._toggleComponentURL, reqObject);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  getDiagnosticProcedureComponent() {
    return this.http.post(environment._iotComponentURL, {});
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  searchComponent(searchTerm: any, pageNo: any) {
    const body = {
      term: searchTerm,
      pageNo: pageNo,
    };

    return this.http.post(environment.getLOINCRecord, body);
    // .map(res => res.json());
  }
}
