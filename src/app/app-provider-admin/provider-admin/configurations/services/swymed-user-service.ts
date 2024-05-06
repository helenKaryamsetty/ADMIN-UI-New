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
export class SwymedUserConfigurationService {
  providerAdmin_base_url: any;
  getMappedUserDetails: any;
  getAllDesignationsUrl: any;
  getUserNameUrl: any;
  getVideoConsultationDomainUrl: any;
  saveSwymedUserDetailsUrl: any;
  updateUserDetailsUrl: any;
  mappingActivationDeactivationUrl: any;

  constructor(
    private http: HttpClient,
    public basePaths: ConfigService,
  ) {
    this.providerAdmin_base_url = this.basePaths.getAdminBaseUrl();
    this.getMappedUserDetails =
      this.providerAdmin_base_url + 'videoConsultation/getmappedUsers/';
    this.getAllDesignationsUrl =
      this.providerAdmin_base_url + 'm/getDesignation';
    this.getUserNameUrl =
      this.providerAdmin_base_url + 'videoConsultation/getunmappedUser/';
    this.getVideoConsultationDomainUrl =
      this.providerAdmin_base_url + 'videoConsultation/getdomain/';
    this.saveSwymedUserDetailsUrl =
      this.providerAdmin_base_url + 'videoConsultation/createUser';
    this.updateUserDetailsUrl =
      this.providerAdmin_base_url + 'videoConsultation/editUser';
    this.mappingActivationDeactivationUrl =
      this.providerAdmin_base_url + 'videoConsultation/deleteUser/';
  }

  getSwymedUserDetails(serviceProviderID: any) {
    return this.http.post(
      environment.getMappedUserDetails + serviceProviderID,
      {},
    );
  }
  getAllDesignations() {
    return this.http.post(environment.getAllDesignationsUrl, {});
  }
  getUserName(designationID: any, serviceProviderID: any) {
    return this.http.get(
      environment.getUserNameUrl + serviceProviderID + '/' + designationID,
    );
  }
  getVideoConsultationDomain(serviceProviderID: any) {
    return this.http.post(
      environment.getVideoConsultationDomainUrl + serviceProviderID,
      {},
    );
  }
  saveSwymedUserDetails(reqObj: any) {
    return this.http.post(environment.saveSwymedUserDetailsUrl, reqObj);
  }
  updateUserDetails(updateObj: any) {
    return this.http.post(environment.updateUserDetailsUrl, updateObj);
  }
  mappingActivationDeactivation(
    userVideoConsultationMapID: any,
    flag: any,
    modifiedBy: any,
  ) {
    return this.http.get(
      environment.mappingActivationDeactivationUrl +
        userVideoConsultationMapID +
        '/' +
        flag +
        '/' +
        modifiedBy,
      {},
    );
  }
}
