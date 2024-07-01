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

// import { Http, Response } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';

@Injectable()
export class dataService {
  userNameForReset: any;
  Userdata: any = sessionStorage.getItem('Userdata') || '[]';
  userPriveliges: any = sessionStorage.getItem('userPriveliges') || '[]';

  uid: any = sessionStorage.getItem('uid');
  uname: any = sessionStorage.getItem('uname');
  benData: any = sessionStorage.getItem('benData');
  role: any = sessionStorage.getItem('role');
  beneficiaryData: any = sessionStorage.getItem('beneficiaryData');
  callData: any = sessionStorage.getItem('callData');
  service_providerID: any = sessionStorage.getItem('service_providerID');
  provider_serviceMapID: any = sessionStorage.getItem('provider_serviceMapID');
  serviceID104: any = 3;
  serviceIDMMU: any = 2;
  currentLanguage: any;
  current_serviceID: any = 3;
  providerServiceMapID_104: any;
}
