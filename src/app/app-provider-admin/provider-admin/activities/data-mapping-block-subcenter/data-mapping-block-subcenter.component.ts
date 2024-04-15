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
import { BlockSubcenterMappingService } from '../services/block-subcenter-mapping-service';
import { ConfirmationDialogsService } from 'src/app/core/services/dialog/confirmation.service';
import { dataService } from 'src/app/core/services/dataService/data.service';

// import * as ExcelJS from 'exceljs';

@Component({
  selector: 'app-data-mapping-block-subcenter',
  templateUrl: './data-mapping-block-subcenter.component.html',
  styleUrls: ['./data-mapping-block-subcenter.component.css'],
})
export class DataMappingBlockSubcenterComponent implements OnInit {
  file: any;
  fileList!: FileList;
  error1 = false;
  error2 = false;
  invalid_file_flag = false;
  inValidFileName = false;
  maxFileSize = 5.0;
  jsonData: any;
  enableUPloadButton = false;
  valid_file_extensions = ['xls', 'xlsx', 'xlsm', 'xlsb'];
  fileContent: any;
  userID: any;
  showProgressBar = false;
  disableUpload = true;
  showUpload = false;

  constructor(
    public dataService: dataService,
    public blockSubcenterMappingService: BlockSubcenterMappingService,
    public alertService: ConfirmationDialogsService,
  ) {}

  ngOnInit() {
    this.userID = this.dataService.uid;
    const servicelines = this.dataService.userPriveliges;
    for (const element of servicelines) {
      if (element.serviceDesc.toLowerCase() === '104 helpline') {
        this.showUpload = true;
        return this.showUpload;
      }
    }
    this.showUpload = false;
    return this.showUpload;
  }

  onFileUpload(ev: any) {
    this.showProgressBar = true;
    this.file = undefined;

    this.fileList = ev.target.files;
    this.file = ev.target.files[0];

    //this.file = undefined;
    if (this.fileList.length === 0) {
      this.error1 = true;
      this.error2 = false;
      this.invalid_file_flag = false;
      this.inValidFileName = false;
      this.disableUpload = false;
      this.showProgressBar = false;
    } else {
      if (this.file) {
        const fileNameExtension = this.file.name.split('.');
        const fileName = fileNameExtension[0];
        if (fileName !== undefined && fileName !== null && fileName !== '') {
          const isvalid = this.checkExtension(this.file);
          console.log(isvalid, 'VALID OR NOT');
          if (isvalid) {
            if (this.fileList[0].size / 1000 / 1000 > this.maxFileSize) {
              console.log('File Size' + this.fileList[0].size / 1000 / 1000);
              this.error2 = true;
              this.error1 = false;
              this.invalid_file_flag = false;
              this.inValidFileName = false;
              this.disableUpload = false;
              this.showProgressBar = false;
            } else {
              this.error1 = false;
              this.error2 = false;
              this.invalid_file_flag = false;
              this.inValidFileName = false;
              this.disableUpload = false;

              const workBook: any = null;
              // let workBook : any;
              this.jsonData = null;
              const reader = new FileReader();

              // reader.onload = (event) => {
              //   const data = reader.result;
              //   workBook =  ExcelJS.read(data, { type: 'binary' });
              //   this.jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
              //     const sheet = workBook.Sheets[name];
              //     initial[name] = ExcelJS.utils.sheet_to_json(sheet);
              //     return initial;
              //   }, {});
              //  // this.dataString = JSON.stringify(jsonData.Sheet1);

              // }
              this.enableUPloadButton = false;
              reader.readAsBinaryString(this.file);

              const myReader: FileReader = new FileReader();
              myReader.onloadend = this.onLoadFileCallback.bind(this);
              myReader.readAsDataURL(this.file);
              this.invalid_file_flag = false;
              this.disableUpload = false;
            }
          } else {
            this.invalid_file_flag = true;
            this.inValidFileName = false;
            this.error1 = false;
            this.error2 = false;
            this.disableUpload = false;
            this.showProgressBar = false;
          }
        } else {
          //this.alertService.alert("Invalid file name", 'error');
          this.inValidFileName = true;
          this.invalid_file_flag = false;
          this.error2 = false;
          this.error1 = false;
          this.disableUpload = false;
          this.showProgressBar = false;
        }
      } else {
        this.invalid_file_flag = false;
        this.disableUpload = false;
        this.showProgressBar = false;
      }
    }
  }

  checkExtension(file: any) {
    let count = 0;
    console.log('FILE DETAILS', file);
    if (file) {
      const array_after_split = file.name.split('.');
      if (array_after_split.length === 2) {
        const file_extension = array_after_split[array_after_split.length - 1];
        for (let i = 0; i < this.valid_file_extensions.length; i++) {
          if (
            file_extension.toUpperCase() ===
            this.valid_file_extensions[i].toUpperCase()
          ) {
            count = count + 1;
          }
        }
        if (count > 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  onLoadFileCallback = (event: any) => {
    this.fileContent = event.currentTarget.result;
    this.showProgressBar = false;
  };

  uploadFile() {
    const fileExtenstion = this.file.name.split('.');
    const reqObj = {
      fileName: this.file.name,
      fileExtension: fileExtenstion[fileExtenstion.length - 1],
      fileContent: this.fileContent,
      providerServiceMapID: this.dataService.providerServiceMapID_104,
      createdBy: this.dataService.uname,
    };
    this.showProgressBar = true;
    this.blockSubcenterMappingService
      .uploadData(reqObj)
      .subscribe((response: any) => {
        if (response && response.statusCode === 200) {
          this.showProgressBar = false;
          this.alertService.alert('File Uploaded successfully', 'success');
          this.resetFileInput();
          this.file = undefined;
          this.fileContent = null;
          this.disableUpload = true;
        } else {
          this.showProgressBar = false;
          this.alertService.alert(response.errorMessage, 'error');
          this.resetFileInput();
          this.file = undefined;
          this.fileContent = null;
          this.disableUpload = true;
        }
      });
    (err: any) => {
      this.showProgressBar = false;
      this.alertService.alert(err, 'error');
      this.resetFileInput();
      this.file = undefined;
      this.fileContent = null;
      this.disableUpload = true;
    };
  }

  resetFileInput() {
    const fileInput = document.getElementById(
      'upload-file',
    ) as HTMLInputElement;
    fileInput.value = '';
  }
}
