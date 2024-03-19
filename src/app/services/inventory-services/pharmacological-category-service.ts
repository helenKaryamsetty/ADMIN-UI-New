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
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ConfigService } from '../config/config.service';
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
    this.getPharmacologyListUrl =
      this.adminBaseUrl + 'getPharmacologicalcategory';
    return this.http.post(this.getPharmacologyListUrl, {
      providerServiceMapID: providerServiceMapID,
    });
    // .map(this.extractData)
    // .catch(this.handleError)
  }
  savePharmacology(obj: any) {
    this.savePharmacologyUrl =
      this.adminBaseUrl + 'createPharmacologicalcategory';
    return this.http.post(this.savePharmacologyUrl, obj);
    // .map(this.extractCustomData)
    //     .catch(this.handleError);
  }
  updatePharmacology(obj: any) {
    this.updatePharmacologyUrl =
      this.adminBaseUrl + 'editPharmacologicalcategory';
    return this.http.post(this.updatePharmacologyUrl, obj);
    // .map(this.extractCustomData)
    //     .catch(this.handleError);
  }
  deletePharmacology(obj: any) {
    this.deletePharmacologyUrl =
      this.adminBaseUrl + 'deletePharmacologicalcategory';
    return this.http.post(this.deletePharmacologyUrl, obj);
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
  // private extractCustomData(res: Response) {
  //     if (res.json().data) {
  //         console.log('Pharmacology Category Master Custom Service', res.json().data);
  //         return res.json().data;
  //     } else {
  //         return Observable.throw(res.json());
  //     }
  // }
  // private extractData(res: Response) {
  //     if (res.json().data && res.json().statusCode == 200) {
  //         console.log('Pharmacology Category Master Service', res.json(), res.json().data);
  //         return res.json().data;
  //     } else {
  //         return Observable.throw(res.json());
  //     }
  // }
  // private handleCustomError(error: Response | any) {
  //     return Observable.throw(error.json());
  // }
  // private handleError(error: Response | any) {
  //     return Observable.throw(error.json());
  // }
}
