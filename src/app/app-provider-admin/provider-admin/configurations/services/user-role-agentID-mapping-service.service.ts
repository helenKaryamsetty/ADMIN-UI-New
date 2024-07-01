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
 * Author: Diamond Khanna ( 352929 )
 * Date: 24-07-2017
 * Objective: # A service which would handle the creation of employees and their
               role provisioning
               */
@Injectable()
export class UserRoleAgentID_MappingService {
  admin_Base_Url: any;
  common_Base_Url: any;

  get_State_Url: any;
  get_Service_Url: any;
  get_Roles_Url: any;
  get_Roles_Url_new: any;

  get_Campaigns_Url: any;
  get_AgentIDs_Url: any;

  //  CRUD
  getEmployeeUrl: any;
  mapAgentID_Url: any;

  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {
    this.admin_Base_Url = this.basepaths.getAdminBaseUrl();
    this.common_Base_Url = this.basepaths.getCommonBaseURL();

    this.get_State_Url = this.admin_Base_Url + 'm/role/stateNew';
    this.get_Service_Url = this.admin_Base_Url + 'm/role/serviceNew';
    this.get_Roles_Url = this.admin_Base_Url + 'm/role/searchV1';

    this.get_Campaigns_Url = this.admin_Base_Url + 'getAvailableCampaigns';
    this.get_AgentIDs_Url = this.admin_Base_Url + 'getAvailableAgentIds';

    this.getEmployeeUrl = this.admin_Base_Url + 'm/SearchEmployeeFilter';
    this.mapAgentID_Url = this.admin_Base_Url + 'usrRoleAndCtiMapping';
  }

  getStates(userID: any, serviceID: any, isNational: any) {
    return this.http.post(environment.getStatesUrl, {
      userID: userID,
      serviceID: serviceID,
      isNational: isNational,
    });
  }

  getServices(userID: any) {
    return this.http.post(environment.getServiceLinesUrl, {
      userID: userID,
    });
  }

  getRoles(providerServiceMapID: any) {
    return this.http.post(environment.get_Roles_Url, {
      providerServiceMapID: providerServiceMapID,
    });
  }

  getEmployees(requestObject: any) {
    return this.http.post(environment.getEmployeeUrl, requestObject);
  }

  getAvailableCampaigns(providerServiceMapID: any) {
    return this.http.post(environment.get_Campaigns_Url, {
      providerServiceMapID: providerServiceMapID,
    });
  }

  getAgentIDs(providerServiceMapID: any, campaign_name: any) {
    return this.http.post(environment.get_AgentIDs_Url, {
      providerServiceMapID: providerServiceMapID,
      cti_CampaignName: campaign_name,
    });
  }

  mapAgentID(data: any) {
    return this.http.post(environment.mapAgentID_Url, data);
  }
}
