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
import { throwError } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { environment } from 'src/environments/environment';
// import { InterceptedHttp } from './../../http.interceptor';
// import { SecurityInterceptedHttp } from '../../http.securityinterceptor';

@Injectable()
export class CallServices {
  _commoUrl = this._config.getCommonBaseURL();
  providerAdmin_Base_Url = this._config.getAdminBaseUrl();
  _closecallurl = 'services/closeCall/';
  _callsummaryurl = '/services/getCallSummary/';
  _getCampaign = this._commoUrl + 'cti/getCampaignNames';
  _addCampaign =
    this.providerAdmin_Base_Url + 'createCitMappingwithServiceLines';
  _getCampaignList =
    this.providerAdmin_Base_Url + 'getMappedServiceLinesAndStatetoProvider';

  get_State_Url = this.providerAdmin_Base_Url + 'm/role/stateNew';
  constructor(
    private _http: HttpClient,
    private _config: ConfigService,
  ) {}

  getAllMappedServicelinesAndStates(serviceProviderID: any) {
    console.log('Mappedservice', serviceProviderID);

    return this._http.post(environment._getCampaignList, {
      serviceProviderID: serviceProviderID,
    });
    // .map(this.extractData_campaignList).catch(this.handleError);
  }
  getStates(userID: any, serviceID: any, isNational: any) {
    return this._http.post(environment.get_State_Url, {
      userID: userID,
      serviceID: serviceID,
      isNational: isNational,
    });
    // .map(this.extractData)
    // .catch(this.handleError);
  }

  getCampaign(serviceName: any) {
    return this._http.post(environment._getCampaign, {
      serviceName: serviceName,
    });
    // .map(this.extractData_campaign)
    // .catch(this.handleError);
  }

  addCampaign(campaignObj: any) {
    return this._http.post(environment._addCampaign, campaignObj);
    // .map(this.extractData).catch(this.handleError);
  }
  /* For edit and create same API - /createCitMappingwithServiceLines */
  editCampaign(campaignObj: any) {
    return this._http.post(environment._addCampaign, campaignObj);
    // .map(this.extractData).catch(this.handleError);
  }
  private extractData(res: Response) {
    console.log('after updation', res);
    if (res) {
      return res;
    } else {
      // return Observable.throw(res.json());
      return throwError(res);
    }
  }
  private handleError(err: Response) {
    // return Observable.throw(err.json());
    return throwError(err);
  }
}
