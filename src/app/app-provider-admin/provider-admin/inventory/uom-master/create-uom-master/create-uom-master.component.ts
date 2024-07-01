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
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogsService } from 'src/app/core/services/dialog/confirmation.service';
import { UomMasterService } from 'src/app/core/services/inventory-services/uom-master.service';

@Component({
  selector: 'app-create-uom-master',
  templateUrl: './create-uom-master.component.html',
  styleUrls: ['./create-uom-master.component.css'],
})
export class CreateUomMasterComponent implements OnInit, AfterViewInit {
  @Input()
  otherDetails: any;

  @Output()
  modeChange = new EventEmitter();

  UOMMasterForm!: FormGroup;
  createdBy!: string;
  providerServiceMapID!: string;
  // UOMMasterList: any = [];
  UOMMasterList = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private fb: FormBuilder,
    private notificationService: ConfirmationDialogsService,
    private uomMasterService: UomMasterService,
  ) {}

  ngOnInit() {
    this.UOMMasterForm = this.createUOMMasterForm();
    if (this.otherDetails) {
      this.createdBy = this.otherDetails.createdBy;
      this.providerServiceMapID = this.otherDetails.providerServiceMapID;
    }
  }
  ngAfterViewInit() {
    this.UOMMasterList.paginator = this.paginator;
  }

  createUOMMasterForm() {
    return this.fb.group({
      UOM: this.fb.group({
        uOMCode: null,
        uOMName: null,
        uOMDesc: null,
      }),
    });
  }

  addToUOMMasterList() {
    if (this.UOMMasterForm.valid) {
      const temp = JSON.parse(JSON.stringify(this.UOMMasterForm.value));
      if (temp && temp.UOM && temp.UOM.uOMCode) {
        this.UOMMasterList.data.push(temp.UOM);
        this.UOMMasterList.paginator = this.paginator;
        this.UOMMasterForm.controls['UOM'].reset();
      }
    } else {
      this.notificationService.alert('Enter the required field or valid value');
    }
  }

  checkForUniqueUOMCode() {
    const temp = JSON.parse(JSON.stringify(this.UOMMasterForm.value));
    if (temp.UOM.uOMCode) {
      const arr = this.UOMMasterList.data.filter(
        (item: any) => item.uOMCode === temp.UOM.uOMCode,
      );
      this.UOMMasterList.paginator = this.paginator;
      this.uomMasterService
        .checkForUniqueUOMCode(temp.UOM.uOMCode, this.providerServiceMapID)
        .subscribe((response: any) => {
          const flag = response.response;
          if (flag === 'true' || arr.length > 0) {
            (<FormGroup>this.UOMMasterForm.controls['UOM']).controls[
              'uOMCode'
            ].setErrors({ unique: true });
          } else {
            (<FormGroup>this.UOMMasterForm.controls['UOM']).controls[
              'uOMCode'
            ].setErrors(null);
          }
          console.log(response, temp.length);
        });
    }
  }

  deleteFromUOMMasterList(i: any) {
    this.UOMMasterList.data.splice(i, 1);
    this.UOMMasterList = new MatTableDataSource<any>(this.UOMMasterList.data);
    this.UOMMasterList.paginator = this.paginator;
  }

  submitUOMForm() {
    const temp = this.UOMMasterList.data.slice();
    this.UOMMasterList.paginator = this.paginator;
    temp.forEach((item: any) => {
      item.createdBy = this.createdBy;
      item.providerServiceMapID = this.providerServiceMapID;
    });

    this.uomMasterService.postUOMMaster(temp).subscribe(
      (response: any) => {
        if (response.data.length > 0) {
          this.notificationService.alert('Saved successfully', 'success');
          this.switchToViewMode();
        }
      },
      (err) => {
        this.notificationService.alert(err.errorMessage, 'error');
        console.error('error in fetching uom masters');
      },
    );
  }

  switchToViewMode() {
    this.modeChange.emit('view');
  }
}
