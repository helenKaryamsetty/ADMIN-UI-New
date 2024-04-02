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

export const environment = {
  production: false,

  //Role Master APIs
  get_State_Url: `${ADMIN_API}m/role/state`,
  get_Service_Url: `${ADMIN_API}m/role/service`,
  find_Roles_By_State_Service_Url: `${ADMIN_API}m/role/search`,
  create_Roles_Url: `${ADMIN_API}m/role/addRole`,
  delete_Role_Url: `${ADMIN_API}m/role/deleteRole`,
  edit_Role_Url: `${ADMIN_API}m/role/editRole`,
  getFeaturesUrl: `${ADMIN_API}m/searchFeature`,
  updateFeatureToRole_Url: `${ADMIN_API}mapExterafeature`,
  getServiceLines_new_url: `${ADMIN_API}m/role/serviceNew`,
  getStates_new_url: `${ADMIN_API}m/role/stateNew`,


};
