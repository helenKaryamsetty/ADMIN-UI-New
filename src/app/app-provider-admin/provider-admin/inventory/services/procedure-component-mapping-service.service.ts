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
// import { InterceptedHttp } from '../../http.interceptor';
// import { SecurityInterceptedHttp } from '../../http.securityinterceptor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { environment } from 'src/environments/environment';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';

@Injectable()
export class ProcedureComponentMappingServiceService {
  providerAdmin_Base_Url: any;
  common_Base_Url: any;

  _getProcedureListURL: any;
  _getComponentListURL: any;
  _setProcedureComponentMapURL: any;
  _getCurrentMappingsURL: any;
  _getprocedureConfigDetailsURL: any;
  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {
    this.providerAdmin_Base_Url = this.basepaths.getAdminBaseUrl();
    this.common_Base_Url = this.basepaths.getCommonBaseURL();
    this._setProcedureComponentMapURL =
      this.providerAdmin_Base_Url + 'labModule/createProcedureComponentMapping';
    this._getComponentListURL =
      this.providerAdmin_Base_Url + 'labModule/fetchComponentMasterDelFalse/';
    this._getProcedureListURL =
      this.providerAdmin_Base_Url + 'labModule/fetchProcedureMasterDelFalse/';
    this._getCurrentMappingsURL = this.providerAdmin_Base_Url + '';
    this._getprocedureConfigDetailsURL = this.providerAdmin_Base_Url + '';
  }

  getProceduresList(providerServiceMapID: any) {
    return this.http.get(
      `${environment._getProcedureListURL}${providerServiceMapID}`,
    );
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  getSelectedProcedureMappings(procedureID: any) {
    return this.http.get(
      `${this._getprocedureConfigDetailsURL}labModule/fetchProcCompMappingForSingleProcedure/${procedureID}`,
    );
    // .map(this.handleSuccess)
    // .catch(this.handleSuccess)
  }

  getCurrentMappings(providerServiceMapID: any) {
    return this.http.get(
      `${this._getCurrentMappingsURL}labModule/fetchprocCompMappingDelFalse/${providerServiceMapID}`,
    );
    // .map(this.handleSuccess)
    // .catch(this.handleError)
  }

  getComponentsList(providerServiceMapID: any) {
    return this.http.get(
      `${environment.getComponentNewListURL}${providerServiceMapID}`,
    );
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }

  saveProcedureComponentMapping(apiObject: any) {
    return this.http.post(environment._setProcedureComponentMapURL, apiObject);
    // .map(this.handleSuccess)
    // .catch(this.handleError);
  }
}
