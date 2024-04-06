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
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/core/services/config/config.service';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';

@Injectable()
export class SnomedMasterService {
  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {}
  searchSnomedRecord(searchTerm: any, pageNo: any) {
    const body = {
      term: searchTerm,
      pageNo: pageNo,
    };

    return this.http.post(environment.getSnomedRecord, body);
  }

  getMasterList(masterType: any) {
    const body = {
      masterType: masterType,
    };
    return this.http.post(environment.getmasterList, body);
  }

  saveSctMapping(mapping: any) {
    return this.http.post(environment.saveMappingList, mapping);
  }

  editSctMapping(mapping: any) {
    return this.http.post(environment.editMappingList, mapping);
  }

  updateBlock(status: any) {
    return this.http.post(environment.updateBlockStatus, status);
  }
}
