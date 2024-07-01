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

@Injectable()
export class ServicePointMasterService {
  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {}
  getServices(userID: any) {
    return this.http.post(environment._getServiceLineURL, { userID: userID });
  }

  getStates(userID: any, serviceID: any, isNationalFlag: any) {
    return this.http.post(environment._getStateListURL, {
      userID: userID,
      serviceID: serviceID,
      isNational: isNationalFlag,
    });
  }

  getZones(data: any) {
    return this.http.post(environment._getZonesURL, data);
  }

  getParkingPlaces(data: any) {
    return this.http.post(environment.getParkingPlacesURL, data);
  }

  getDistricts(zoneID: any) {
    return this.http.post(environment._getDistrictZoneListURL, {
      zoneID: zoneID,
    });
  }

  getServicePoints(data: any) {
    return this.http.post(environment.getServicePointsURL, data);
  }

  getTaluks(talukObj: any) {
    return this.http.post(environment._getTalukServiceListURL, talukObj);
  }

  saveServicePoint(data: any) {
    return this.http.post(environment.saveServicePointsURL, data);
  }
  updateServicePoint(data: any) {
    return this.http.post(environment.updateServicePointsURL, data);
  }

  updateServicePointStatus(data: any) {
    return this.http.post(environment.updateServicePointStatusURL, data);
  }
}
