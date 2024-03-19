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
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Subscription } from 'rxjs';
// import 'rxjs/Rx';
// import { SecurityInterceptedHttp } from './http.securityinterceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { merge, of, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isConnected: Observable<boolean>;
  constructor(private httpInterceptor: HttpClient) {
    this.isConnected = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'ofline').pipe(map(() => false)),
    );
  }
  ngOnInit() {
    this.isConnected.subscribe((bool) => {
      // this.httpInterceptor.onlineFlag = bool;
      // this.securityInterceptor.onlineFlag = bool;
    });
  }
}
