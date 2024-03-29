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
import { Observable, throttleTime, throwError } from 'rxjs';

// import { SecurityInterceptedHttp } from '../../http.securityinterceptor';

/**
 * Author: Diamond Khanna ( 352929 )
 * Date: 29-05-2017
 * Objective: A common service for all HTTP services, just pass the URL and required DATA
 */

@Injectable()
export class HttpServices {
  constructor(private http: HttpClient) {}

  // getData(url: string) {
  //   return this.http.get(url);
  //   // .map(this.handleGetSuccess)
  //   // .catch(this.handleGetError);
  // }
  getData(url: string): Observable<any> {
    return this.http.get(url);
  }

  getCommitDetails(url: string): Observable<any> {
    return this.http.get(url);
    // .map(this.handleGetSuccess)
    // .catch(this.handleGetError);
  }

  handleGetSuccess(response: Response) {
    return response;
  }

  handleGetError(error: Response | any) {
    return throwError(error);
  }

  // handleGetSuccessForSecurity(response: Response) {
  // 	if (response) {
  // 		return response.json();
  // 	  }
  // 	}

  // securityData(url: string, data: any) {
  // 	return this.http.post(url, data)
  // 		// .map(this.handleGetSuccess)
  // 		// .catch(this.handleGetError);
  // }
}
