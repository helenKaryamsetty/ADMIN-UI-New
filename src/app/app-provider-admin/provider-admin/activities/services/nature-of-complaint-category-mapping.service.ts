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

@Injectable()
export class NatureOfCompaintCategoryMappingService {
  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {}
  getServiceLines(userID: any): Observable<any> {
    return this.http.post(environment.getServiceLines_url, { userID: userID });
  }

  getStates(obj: any) {
    return this.http.post(environment.getStates_url, obj);
  }

  getFeedbackTypes(providerServiceMapID: any) {
    return this.http.post(environment.getFeedbackTypes_Url, {
      providerServiceMapID: providerServiceMapID,
    });
  }

  getFeedbackNatureTypes(natureObject: any) {
    return this.http.post(environment.getFeedbackNatureTypes_url, natureObject);
  }

  getMapping(reqObj: any) {
    return this.http.post(environment.getMapping_url, reqObj);
  }

  getAllCategory(providerServiceMapID: any) {
    return this.http.post(environment.getCategoryID_url, {
      providerServiceMapID: providerServiceMapID,
    });
  }

  unmapCategory(unmapObj: any) {
    return this.http.post(environment.unmapCategory_url, unmapObj);
  }

  filterMappedCategory(providerServiceMapID: any) {
    return this.http.post(environment.filterMappedCategory_url, {
      providerServiceMapID: providerServiceMapID,
    });
  }

  saveComplaintToCategoryMapping(mappingObj: any) {
    return this.http.post(
      environment.saveComplaintToCategoryMapping_url,
      mappingObj,
    );
  }

  updateComplaintCategoryMapping(updateObj: any) {
    return this.http.post(
      environment.updateComplaintCategoryMapping_url,
      updateObj,
    );
  }
}
