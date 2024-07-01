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
export class ZoneMasterService {
  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {}

  saveZones(data: any) {
    return this.http.post(environment.saveZonesURL, data);
  }

  getZones(data: any) {
    return this.http.post(environment.getZonesURL, data);
  }

  saveZoneDistrictMappings(data: any) {
    return this.http.post(environment.saveZoneDistrictMappingURL, data);
  }

  getZoneDistrictMappings(data: any) {
    return this.http.post(environment.getZoneDistrictMappingURL, data);
  }

  updateZoneStatus(data: any) {
    return this.http.post(environment.updateZOneStatusURL, data);
  }

  updateZoneMappingData(data: any) {
    return this.http.post(environment.updateZoneMappingDataUrl, data);
  }

  updateZoneMappingStatus(data: any) {
    return this.http.post(environment.updateZOneDistrictMappingURL, data);
  }

  updateZoneData(data: any) {
    return this.http.post(environment.updateZoneDataURL, data);
  }

  getServiceLinesNew(userID: any) {
    return this.http.post(environment.getServiceLines_new_url, {
      userID: userID,
    });
  }

  getStatesNew(obj: any) {
    return this.http.post(environment.getStateszone_new_url, obj);
  }

  getDistricts(stateId: number) {
    return this.http.get(environment.getDistrictZoneListURL + stateId);
  }

  getTaluks(districtId: number) {
    return this.http.get(environment.getTalukZoneListURL + districtId);
  }

  getSTBs(talukId: number) {
    return this.http.get(environment._getBlockListURL + talukId);
  }

  getBranches(blockId: number) {
    return this.http.get(environment._getBranchListURL + blockId);
  }
}
