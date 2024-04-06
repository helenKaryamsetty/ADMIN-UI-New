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
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const ADMIN_API = 'https://amritwprdev.piramalswasthya.org/';
const COMMON_API = 'https://amritwprdev.piramalswasthya.org/';
const adminBaseUrl = `${ADMIN_API}adminapi-v0.1/`;
const superadminBaseURL = `${ADMIN_API}adminapi-v0.1/`;
const commonBaseURL = `${COMMON_API}commonapi-v0.1/`;

export const environment = {
  production: true,

  adminBaseUrl: adminBaseUrl,
  superadminBaseURL: superadminBaseURL,
  commonBaseURL: commonBaseURL,

  extendSessionUrl: `${COMMON_API}common/extend/redisSession`,

  //Role Master APIs
  get_State_Url: `${adminBaseUrl}m/role/state`,
  get_Service_Url: `${adminBaseUrl}m/role/service`,
  find_Roles_By_State_Service_Url: `${adminBaseUrl}m/role/search`,
  create_Roles_Url: `${adminBaseUrl}m/role/addRole`,
  delete_Role_Url: `${adminBaseUrl}m/role/deleteRole`,
  edit_Role_Url: `${adminBaseUrl}m/role/editRole`,
  getFeaturesUrl: `${adminBaseUrl}m/searchFeature`,
  updateFeatureToRole_Url: `${adminBaseUrl}mapExterafeature`,
  getServiceLines_new_url: `${adminBaseUrl}m/role/serviceNew`,
  getStates_new_url: `${adminBaseUrl}m/role/stateNew`,

  //SMS Template APIs
  getSMStemplates_url: `${commonBaseURL}sms/getSMSTemplates`,
  saveSMStemplate_url: `${commonBaseURL}sms/saveSMSTemplate`,
  updateSMStemplate_url: `${commonBaseURL}sms/updateSMSTemplate`,
  getSMStypes_url: `${commonBaseURL}sms/getSMSTypes`,
  getSMSparameters_url: `${commonBaseURL}sms/getSMSParameters`,
  getFullSMSTemplate_url: `${commonBaseURL}sms/getFullSMSTemplate`,
  sendSMS_url: `${commonBaseURL}sms/sendSMS`,

  //snomed ct code
  getSnomedRecord: `${commonBaseURL}snomed/getSnomedCTRecordList`,
  getmasterList: `${adminBaseUrl}snomed/fetchSnomedWorklist`,
  saveMappingList: `${adminBaseUrl}snomed/saveSnomedMappingData`,
  editMappingList: `${adminBaseUrl}snomed/editSnomedMappingData`,
  updateBlockStatus: `${adminBaseUrl}snomed/updateStatus`,

  //Questionnaire APIs
  saveQuestionnaire_url: `${adminBaseUrl}saveQuestionnaire`,
  deleteQuestionnaire_url: `${adminBaseUrl}deleteQuestionnaire`,
  getQuestionnaire_url: `${adminBaseUrl}getQuestionnaireList`,
  get_Services_Url: `${adminBaseUrl}m/role/serviceNew`,
  getQuestionType_url: `${commonBaseURL}questionTypeController/get/questionTypeList`,
  editQuestionnaire_url: `${adminBaseUrl}editQuestionnaire`,
};
