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
import { Router, ActivatedRoute, CanActivate } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { dataService } from '../dataService/data.service';

@Injectable()
export class AuthGuard implements CanActivate {
  _baseURL = this._config.getCommonBaseURL();
  _authorisedUser = this._baseURL + 'user/getLoginResponse';
  _deleteToken = this._baseURL + 'user/userLogout';
  constructor(
    private router: Router,
    private _config: ConfigService,
    private route: ActivatedRoute,
    public dataSettingService: dataService,
  ) {}

  canActivate(route: any, state: any) {
    const authkey = sessionStorage.getItem('authToken');

    if (authkey) {
      return true;
    } else {
      return false;
    }
  }
}
