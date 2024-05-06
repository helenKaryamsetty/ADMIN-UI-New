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
 * Date: 11-10-2017
 * Objective: # A service which would handle the AGENT LIST services.
 */

@Injectable()
export class AgentListCreationService {
  admin_Base_Url: any;
  common_Base_Url: any;

  get_State_Url: any;
  get_Service_Url: any;
  get_Campaign_Names_Url: any;
  save_AgentListMapping_Url: any;
  getAllAgents_Url: any;
  edit_AgentListMapping_Url: any;

  constructor(
    private http: HttpClient,
    public basepaths: ConfigService,
  ) {
    this.admin_Base_Url = this.basepaths.getAdminBaseUrl();
    this.common_Base_Url = this.basepaths.getCommonBaseURL();

    this.get_State_Url = this.admin_Base_Url + 'm/role/stateNew';
    this.get_Service_Url = this.admin_Base_Url + 'm/role/serviceNew';
    this.get_Campaign_Names_Url = this.common_Base_Url + 'cti/getCampaignNames';
    this.save_AgentListMapping_Url =
      this.admin_Base_Url + 'createUSRAgentMapping';
    this.getAllAgents_Url = this.admin_Base_Url + 'getAllAgentIds';
    this.edit_AgentListMapping_Url =
      this.admin_Base_Url + 'updateCTICampaignNameMapping';
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
  getAllAgents(providerServiceMapID: any) {
    return this.http.post(environment.getAllAgents_Url, {
      providerServiceMapID: providerServiceMapID,
    });
  }
  getCampaignNames(serviceName: any) {
    return this.http.post(environment.get_Campaign_Names_Url, {
      serviceName: serviceName,
    });
  }

  saveAgentListMapping(data: any) {
    return this.http.post(environment.save_AgentListMapping_Url, data);
  }
  editAgentDetails(data: any) {
    return this.http.post(environment.edit_AgentListMapping_Url, data);
  }
}
