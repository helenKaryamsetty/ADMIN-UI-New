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
import { ConfigService } from 'src/app/core/services/config/config.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class CallibrationMasterServiceService {
  admin_Base_Url: any;
  delete_CalibrationStrip_Url: any;
  getCalibrationMaster_Url: any;
  save_Calibration_Url: any;
  update_Calibration_Url: any;
  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {
    this.admin_Base_Url = this.basepaths.getAdminBaseUrl();
    this.getCalibrationMaster_Url =
      this.admin_Base_Url + 'fetchCalibrationStrips';
    this.delete_CalibrationStrip_Url =
      this.admin_Base_Url + 'deleteCalibrationStrip';
    this.save_Calibration_Url =
      this.basepaths.getAdminBaseUrl() + 'createCalibrationStrip';
    this.update_Calibration_Url =
      this.basepaths.getAdminBaseUrl() + 'updateCalibrationStrip';
  }
  fetCalibrationMasters(obj: any) {
    return this.http.post(environment.getCalibrationMaster_Url, obj);
  }
  deleteCalibrationStrip(obj: any) {
    console.log('service obj', obj);
    return this.http.post(environment.delete_CalibrationStrip_Url, obj);
  }
  createCalibrationStrip(calibrationObj: any) {
    return this.http.post(environment.save_Calibration_Url, calibrationObj);
  }

  updateCalibrationStrip(calibrationObj: any) {
    return this.http.post(environment.update_Calibration_Url, calibrationObj);
  }
}
