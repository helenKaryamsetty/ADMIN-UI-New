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
import { ConfigService } from 'src/app/core/services/config/config.service';
import { environment } from 'src/environments/environment';

/**
 * Author: krishna Gunti ( 378952 )
 * Date: 02-22-2018
 * Objective: # A service which would handle the Language Mapping services.
 */

@Injectable()
export class LanguageMapping {
  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {}

  getUserName(serviceProviderID: any) {
    return this.http.post(environment.get_ProviderName_Url, {
      serviceProviderID: serviceProviderID,
    });
  }

  getLanguageList() {
    return this.http.get(environment.get_LanguageList_Url);
  }

  getMappedLanguagesList(serviceProviderID: any) {
    return this.http.post(environment.get_LanguageMappedDetails_Url, {
      serviceProviderID: serviceProviderID,
    });
  }

  SaveLanguageMapping(data: any) {
    return this.http.post(environment.get_SaveLanguageMappedDetails_Url, data);
  }

  UpdateLanguageMapping(data: any) {
    return this.http.post(
      environment.get_UpdateLanguageMappedDetails_Url,
      data,
    );
  }

  DeleteLanguageMapping(data: any) {
    return this.http.post(
      environment.get_DeleteLanguageMappedDetails_Url,
      data,
    );
  }
}
