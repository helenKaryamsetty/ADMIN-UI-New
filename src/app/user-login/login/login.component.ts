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
import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { HttpServices } from "../services/http-services/http_services.service";
// import { Subscription } from 'rxjs/Subscription';
// import { InterceptedHttp } from 'app/http.interceptor';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject, EMPTY, Subscription, switchMap } from 'rxjs';
import { dataService } from 'src/app/core/services/dataService/data.service';
import { ConfirmationDialogsService } from 'src/app/core/services/dialog/confirmation.service';
import { HttpInterceptorService } from 'src/app/core/services/httpInterceptor/http-interceptor.service';
import { loginService } from 'src/app/core/services/loginService/login.service';
// import { InterceptedHttp } from '../http.interceptor';
// import { AuthService } from '../services/authentication/auth.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class loginContentClassComponent implements OnInit, OnDestroy {
  model: any = {};
  userID: any;
  password: any;
  serviceProviderID: any;
  status: any;
  dynamictype: any = 'password';
  public loginResult!: string;
  commitDetailsPath: any = 'assets/git-version.json';
  version: any;
  commitDetails: any;
  key: any;
  iv: any;
  SALT = 'RandomInitVector';
  Key_IV = 'Piramal12Piramal';
  encPassword!: string;
  _keySize: any;
  _ivSize: any;
  _iterationCount: any;
  logoutUserFromPreviousSessionSubscription!: Subscription;
  encryptPassword: any;
  // private dologout: any = null;

  constructor(
    public loginservice: loginService,
    public router: Router,
    private alertMessage: ConfirmationDialogsService,
    public dataSettingService: dataService,
    private httpService: HttpInterceptorService,
    // private authService: AuthService
  ) {
    this._keySize = 256;
    this._ivSize = 128;
    this._iterationCount = 1989;
  }

  ngOnInit() {
    this.httpService.dologoutUsrFromPreSession(false);
    this.logoutUserFromPreviousSessionSubscription =
      this.httpService.logoutUserFromPreviousSessions$.subscribe(
        (logoutUser) => {
          if (logoutUser) {
            this.loginUser(true);
          }
        },
      );
    if (sessionStorage.getItem('authToken')) {
      this.loginservice.checkAuthorisedUser().subscribe(
        (response) => this.gotLoginRes(response),
        (err) =>
          console.log('Getting login response through auth token failed' + err),
      );
    }
    this.getCommitDetails();
  }
  gotLoginRes(res: any) {
    if (res.userName === 'Super  Admin') {
      this.dataSettingService.Userdata = { userName: 'Super Admin' };
      this.dataSettingService.role = 'SUPERADMIN';
      this.dataSettingService.uname = 'Super Admin';
      this.router.navigate(['/MultiRoleScreenComponent']);
    } else {
      this.successCallback(res);
    }
  }

  get keySize() {
    return this._keySize;
  }

  set keySize(value) {
    this._keySize = value;
  }

  get iterationCount() {
    return this._iterationCount;
  }

  set iterationCount(value) {
    this._iterationCount = value;
  }

  generateKey(salt: any, passPhrase: any) {
    return CryptoJS.PBKDF2(passPhrase, CryptoJS.enc.Hex.parse(salt), {
      hasher: CryptoJS.algo.SHA512,
      keySize: this.keySize / 32,
      iterations: this._iterationCount,
    });
  }

  encryptWithIvSalt(salt: any, iv: any, passPhrase: any, plainText: any) {
    const key = this.generateKey(salt, passPhrase);
    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
      iv: CryptoJS.enc.Hex.parse(iv),
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  }

  encrypt(passPhrase: any, plainText: any) {
    const iv = CryptoJS.lib.WordArray.random(this._ivSize / 8).toString(
      CryptoJS.enc.Hex,
    );
    const salt = CryptoJS.lib.WordArray.random(this.keySize / 8).toString(
      CryptoJS.enc.Hex,
    );
    const ciphertext = this.encryptWithIvSalt(salt, iv, passPhrase, plainText);
    return salt + iv + ciphertext;
  }

  login(userId: any, password: any, doLogout: any) {
    this.encryptPassword = this.encrypt(this.Key_IV, password);
    if (userId.toLowerCase() === 'SUPERADMIN'.toLowerCase()) {
      // this.loginservice.superAdminAuthenticate(userId, password, doLogout)
      this.loginservice
        .superAdminAuthenticate(userId, this.encryptPassword, doLogout)
        .subscribe(
          (response: any) => {
            if (response.isAuthenticated) {
              if (response.previlegeObj.length === 0) {
                console.log(response, 'SUPERADMIN VALIDATED');
                sessionStorage.setItem('authToken', response.data.key);
                this.dataSettingService.Userdata = { userName: 'Super Admin' };
                this.dataSettingService.role = 'SUPERADMIN';
                this.dataSettingService.uname = 'Super Admin';
                this.dataSettingService.uid = response.userID;
                this.router.navigate(['/MultiRoleScreenComponent']);
              } else {
                this.alertMessage.alert('User is not super admin');
              }
            }
          },
          (err) => {
            this.alertMessage.alert(err, 'error');
            console.log(err, 'ERR while superadmin validation');
          },
        );
    } else {
      this.loginservice
        .authenticateUser(userId, this.encryptPassword, doLogout)
        .subscribe(
          (response) => {
            if (response.data !== undefined) {
              sessionStorage.setItem('authToken', response.data.key);
              this.successCallback(response);
            } else {
              sessionStorage.setItem('authToken', response.key);
              this.successCallback(response);
            }
          },
          (error: any) => {
            this.errorCallback(error);
            // this.alertMessage.alert(error, 'error');
          },
        );
    }
  }

  loginUser(doLogOut: any) {
    this.loginservice
      .userLogOutFromPreviousSession(this.userID)
      .subscribe((userLogOutRes: any) => {
        if (userLogOutRes && userLogOutRes.response) {
          if (this.userID.toLowerCase() === 'SUPERADMIN'.toLowerCase()) {
            this.loginservice
              .superAdminAuthenticate(
                this.userID,
                this.encryptPassword,
                doLogOut,
              )
              .subscribe(
                (response: any) => {
                  if (response.isAuthenticated) {
                    if (response.previlegeObj.length === 0) {
                      console.log(response, 'SUPERADMIN VALIDATED');
                      sessionStorage.setItem('authToken', response.data.key);
                      this.dataSettingService.Userdata = {
                        userName: 'Super Admin',
                      };
                      this.dataSettingService.role = 'SUPERADMIN';
                      this.dataSettingService.uname = 'Super Admin';
                      this.dataSettingService.uid = response.userID;
                      this.router.navigate(['/MultiRoleScreenComponent']);
                    } else {
                      this.alertMessage.alert('User is not super admin');
                    }
                  }
                },
                (err) => {
                  this.alertMessage.alert(err, 'error');
                  console.log(err, 'ERR while superadmin validation');
                },
              );
          } else {
            this.loginservice
              .authenticateUser(this.userID, this.encryptPassword, doLogOut)
              .subscribe(
                (response: any) => {
                  sessionStorage.setItem('authToken', response.data.key);
                  this.successCallback(response);
                },
                (error: any) => {
                  this.errorCallback(error);
                  // this.alertMessage.alert(error, 'error');
                },
              );
          }
        } else {
          this.alertMessage.alert(userLogOutRes.errorMessage, 'error');
        }
      });
  }

  successCallback(response: any) {
    if (response.statusCode === 5002) {
      if (
        response.errorMessage ===
        'You are already logged in,please confirm to logout from other device and login again'
      ) {
        this.alertMessage
          .confirm('info', response.errorMessage)
          .subscribe((confirmResponse) => {
            if (confirmResponse) {
              this.httpService.dologoutUsrFromPreSession(true);
            }
            //   else{
            //     this.authService.removeToken();
            // }
          });
      }
    } else if (response.data !== undefined) {
      console.log(response.data);
      this.dataSettingService.Userdata = response.data;
      this.dataSettingService.userPriveliges = response.data.previlegeObj;
      this.dataSettingService.uid = response.data.userID;
      // this.dataSettingService.service_providerID = response.provider[0].providerID;
      this.dataSettingService.uname = response.data.userName;
      console.log('array', response.data.previlegeObj);

      if (
        response.data.isAuthenticated === true &&
        response.data.Status === 'Active'
      ) {
        sessionStorage.setItem('authToken', response.data.key);
        console.log(
          'response.previlegeObj[0].serviceID',
          response.data.previlegeObj[0].serviceID,
        );
        this.loginservice
          .getServiceProviderID(response.data.previlegeObj[0].serviceID)
          .subscribe(
            (res) => this.getServiceProviderMapIDSuccessHandeler(res),
            (err) => console.log('error in fetching service provider ID', err),
          );
        // this.router.navigate(['/MultiRoleScreenComponent']);
        for (let i = 0; i < response.data.Previlege.length; i++) {
          // for (let j = 0; j < response.Previlege[i].Role.length; j++) {
          if (response.data.Previlege[i].Role === 'ProviderAdmin') {
            // this.router.navigate(['/MultiRoleScreenComponent']);
            this.dataSettingService.role = 'PROVIDERADMIN';
            console.log('VALUE SET HOGAYI');
          } else {
            this.dataSettingService.role = '';
          }
          // }
        }
        if (
          this.dataSettingService.role.toLowerCase() ===
          'PROVIDERADMIN'.toLowerCase()
        ) {
          this.router.navigate(['/MultiRoleScreenComponent']);
        } else {
          this.alertMessage.alert('User is not a provider admin');
        }
      }
      if (
        response.data.isAuthenticated === true &&
        response.data.Status === 'New'
      ) {
        this.status = 'new';
        sessionStorage.setItem('authToken', response.data.key);
        this.router.navigate(['/setQuestions']);
      }

      for (let i = 0; i < response.data?.previlegeObj?.length; i++) {
        if (
          response.data.previlegeObj[i].serviceDesc.toLowerCase() ===
          '104 helpline'
        ) {
          this.dataSettingService.providerServiceMapID_104 =
            response.data.previlegeObj[i].providerServiceMapID;
        }
      }
    }
  }
  errorCallback(error: any) {
    if (error.status) {
      this.loginResult = error.errorMessage;
    } else {
      this.loginResult = 'Internal issue please try after some time';
    }
    // this.loading = false;
    console.log(error);
  }

  // encryptionFlag: boolean = true;

  showPWD() {
    this.dynamictype = 'text';
  }

  hidePWD() {
    this.dynamictype = 'password';
  }

  getServiceProviderMapIDSuccessHandeler(response: any) {
    console.log('service provider map id', response);
    if (response !== undefined) {
      this.dataSettingService.service_providerID = response.serviceProviderID;
      this.serviceProviderID = response.serviceProviderID;
    } else {
      this.alertMessage.alert(
        'Service Provider map ID is not fetched',
        'error',
      );
    }
  }

  getCommitDetails() {
    const Data = this.commitDetailsPath;
    // this.HttpServices.getCommitDetails(this.commitDetailsPath).subscribe((res) => this.successhandeler1(res), err => this.successhandeler1(err));
  }
  successhandeler1(response: any) {
    this.commitDetails = response;
    this.version = this.commitDetails['version'];
  }
  ngOnDestroy() {
    if (this.logoutUserFromPreviousSessionSubscription) {
      this.logoutUserFromPreviousSessionSubscription.unsubscribe();
    }
  }
}
