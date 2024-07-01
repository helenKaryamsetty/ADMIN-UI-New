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
export class PharmacologicalMasterService {
  adminBaseUrl: any;
  getPharmacologyListUrl: any;
  savePharmacologyUrl: any;
  updatePharmacologyUrl: any;
  deletePharmacologyUrl: any;

  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {
    this.adminBaseUrl = this.basepaths.getAdminBaseUrl();
  }

  getAllPharmacologyList(providerServiceMapID: any) {
    return this.http.post(environment.getPharmacologyListUrl, {
      providerServiceMapID: providerServiceMapID,
    });
    // .map(this.extractData)
    // .catch(this.handleError)
  }
  savePharmacology(obj: any) {
    return this.http.post(environment.savePharmacologyUrl, obj);
    // .map(this.extractCustomData)
    //     .catch(this.handleError);
  }
  updatePharmacology(obj: any) {
    return this.http.post(environment.updatePharmacologyUrl, obj);
    // .map(this.extractCustomData)
    //     .catch(this.handleError);
  }
  deletePharmacology(obj: any) {
    return this.http.post(environment.deletePharmacologyUrl, obj);
    // .map(this.extractCustomData)
    //     .catch(this.handleError);
  }
  checkForUniquePharmacolgyCategory(
    pharmCategoryCode: any,
    providerServiceMapID: any,
  ) {
    const checkUrl = this.adminBaseUrl + 'checkPharmacologicalcategoryCode';
    return this.http.post(checkUrl, {
      pharmCategoryCode,
      providerServiceMapID,
    });
    // .map(this.extractData)
    // .catch(this.handleError);
  }
}
