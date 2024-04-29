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
// import { HttpServices } from '../services/http-services/http_services.service';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ConfirmationDialogsService } from 'src/app/core/services/dialog/confirmation.service';
import { loginService } from '../loginService/login.service';
import { dataService } from 'src/app/core/services/dataService/data.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css'],
})
export class SetPasswordComponent {
  passwordPattern =
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/;

  constructor(
    public http_calls: HttpClient,
    private configService: ConfigService,
    public router: Router,
    private alertService: ConfirmationDialogsService,
    public _loginService: loginService,
    private getUserData: dataService,
  ) {
    this._keySize = 256;
    this._ivSize = 128;
    this._iterationCount = 1989;
  }

  //   ngOnInit(): void {}

  newpwd: any;
  confirmpwd: any;

  uname: any = this.getUserData.userNameForReset;

  dynamictype: any = 'password';
  key: any;
  iv: any;
  SALT = 'RandomInitVector';
  Key_IV = 'Piramal12Piramal';
  encPassword!: string;
  _keySize: any;
  _ivSize: any;
  _iterationCount: any;
  encryptedConfirmPwd: any;
  password: any;

  showPWD() {
    this.dynamictype = 'text';
  }

  hidePWD() {
    this.dynamictype = 'password';
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

  updatePassword(new_pwd: any) {
    const transactionId = this._loginService.transactionId;
    this.password = this.encrypt(this.Key_IV, new_pwd);
    this.encryptedConfirmPwd = this.encrypt(this.Key_IV, this.confirmpwd);
    if (new_pwd === this.confirmpwd) {
      this.http_calls
        .post(
          this.configService.getCommonBaseURL() + 'user/setForgetPassword',
          {
            userName: this.uname,
            password: this.password,
            transactionId: transactionId,
          },
        )
        .subscribe(
          (response: any) => {
            if (
              response !== undefined &&
              response !== null &&
              response.statusCode === 200
            )
              this.successCallback(response);
            else {
              this.alertService.alert(response.errorMessage, 'error');
              this.router.navigate(['/resetPassword']);
            }
          },
          (error: any) => {
            this.alertService.alert(error.errorMessage, 'error');
            this.router.navigate(['/resetPassword']);
          },
          (this._loginService.transactionId = undefined),
        );
    } else {
      this.alertService.alert('Password does not match');
    }
  }

  successCallback(response: any) {
    console.log(response);
    this.alertService.alert('Password changed successfully', 'success');
    this.logout();
    // this.router.navigate(['']);
  }
  errorCallback(response: any) {
    console.log(response);
  }

  logout() {
    this._loginService.removeTokenFromRedis().subscribe(
      (response) => {
        if (response) {
          console.log(
            'successfully logged out from CRM and session ended both sides',
          );
          sessionStorage.removeItem('authToken');
          this.router.navigate(['']);
        }
      },
      (err) => {
        this.alertService.alert(err, 'error');
        console.log(err, 'error while ending session both sides');
      },
    );
  }
}
