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
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
// import {Http, Response} from '@angular/http';
@Injectable()
/**
 * Author: Neeraj Kumar ( 298657 )
 * Date: 19-05-2017
 * Objective: Class UserService will be used for Http Services.
 */
export class DashboardHttpServices {
  // Constructor for initialize the Http object...
  constructor(private http: HttpClient) {}
  // Function to call get API, Returns response in Json format...
  // getData(url: string) {
  //     return this.http.get(url).map((res:Response) => console.log(res));
  // }
  // getData(url: string): Observable<any> {
  //   return this.http.get(url);
  // }
  getData(url: string):Observable<any> {
		return this.http.get(url).pipe(map((res:any) => res));
  }
  // Function to call post API, Returns response in Json format...
  postData() {}
}
