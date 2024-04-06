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
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/core/services/config/config.service';

@Injectable()
export class SmsTemplateService {
  constructor(
    private _http: HttpClient,
    public _config: ConfigService,
  ) {}

  getSMStemplates(providerServiceMapID: any, smsTypeID?: any) {
    return this._http.post(environment.getSMStemplates_url, {
      providerServiceMapID: providerServiceMapID,
      smsTemplateTypeID: smsTypeID ? smsTypeID : undefined,
    });
  }

  getFullSMSTemplate(providerServiceMapID: any, smsTemplateID: any) {
    return this._http.post(environment.getFullSMSTemplate_url, {
      providerServiceMapID: providerServiceMapID,
      smsTemplateID: smsTemplateID,
    });
  }

  getSMStypes(serviceID: any) {
    return this._http.post(environment.getSMStypes_url, {
      serviceID: serviceID,
    });
  }

  getSMSparameters(serviceID: any) {
    return this._http.post(environment.getSMSparameters_url, {
      serviceID: serviceID,
    });
  }

  saveSMStemplate(obj: any) {
    return this._http.post(environment.saveSMStemplate_url, obj);
  }

  updateSMStemplate(obj: any) {
    return this._http.post(environment.updateSMStemplate_url, obj);
  }

  sendSMS(obj: any) {
    return this._http.post(environment.sendSMS_url, obj);
  }
}
