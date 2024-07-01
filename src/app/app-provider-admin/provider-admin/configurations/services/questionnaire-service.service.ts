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
import { map } from 'rxjs';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { environment } from 'src/environments/environment';
@Injectable()
export class QuestionnaireServiceService {
  constructor(
    private _http: HttpClient,
    public _config: ConfigService,
  ) {}
  getServices(userID: any) {
    return this._http
      .post(environment.get_Services_Url, {
        userID: userID,
      })
      .pipe(map(this.handleState_n_ServiceSuccess));
  }
  getQuestionTypes() {
    return this._http
      .post(environment.getQuestionType_url, {})
      .pipe(map(this.handleState_n_questionTypeSuccess));
  }
  saveQuestionnaire(obj: any) {
    return this._http.post(environment.saveQuestionnaire_url, obj);
  }
  deleteQuestionaire(obj: any) {
    return this._http.post(environment.deleteQuestionnaire_url, obj);
  }
  fetchQuestionnaire(obj: any) {
    console.log(obj);
    return this._http.post(environment.getQuestionnaire_url, obj);
  }
  editQuestionnaire(obj: any) {
    return this._http.post(environment.editQuestionnaire_url, obj);
  }

  handleState_n_ServiceSuccess(response: any) {
    let result = [];
    result = response.data.filter(function (item: any) {
      if (item.serviceID === 3) {
        return item;
      }
    });
    return result;
  }

  handleState_n_questionTypeSuccess(response: any) {
    let result = [];
    result = response.data.filter(function (item: any) {
      console.log('Items1', item);
      if (
        item.questionTypeID === '4' ||
        item.questionTypeID === '5' ||
        item.questionTypeID === '6'
      ) {
        console.log('Items', item);
        return item;
      }
    });
    console.log('ItemsResult', result);
    return result;
  }
}
