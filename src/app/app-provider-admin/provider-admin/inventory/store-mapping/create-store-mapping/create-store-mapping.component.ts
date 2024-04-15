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
} from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ConfirmationDialogsService } from 'src/app/core/services/dialog/confirmation.service';
import { StoreMappingService } from 'src/app/core/services/inventory-services/store-mapping.service';

@Component({
  selector: 'app-create-store-mapping',
  templateUrl: './create-store-mapping.component.html',
  styleUrls: ['./create-store-mapping.component.css'],
})
export class CreateStoreMappingComponent implements OnInit {
  storeMappingList = new MatTableDataSource<any>();
  // itemArrayObj = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  @Input()
  otherDetails: any;

  @Output()
  modeChange = new EventEmitter();

  storeMappingForm!: FormGroup;
  storeList: any = [];
  mainStoreList: any = [];
  subStoreList: any = [];
  mainParkingPlaceList: any = [];
  parkingPlaceList: any = [];
  vanList: any = [];
  createdBy: any;
  providerServiceMapID: any;
  serviceID: any;
  parkAndHub: any;
  vanAndSpoke: any;

  // storeMappingList:any = [];
  previousParkingPlace: any;
  previousVan: any;
  tempParkingPlaceName: any;

  constructor(
    private fb: FormBuilder,
    private notificationService: ConfirmationDialogsService,
    private storeMappingService: StoreMappingService,
  ) {}

  ngOnInit() {
    this.storeMappingForm = this.createStoreMappingForm();
    if (this.otherDetails) {
      this.createdBy = this.otherDetails.createdBy;
      this.providerServiceMapID = this.otherDetails.providerServiceMapID;
      this.serviceID = this.otherDetails.service.serviceID;
    }
    this.getAllStore(this.providerServiceMapID);
    this.subscribeToStoreSelectionChange();
    this.subscribeToMainStoreChange();
    this.subscribeToSubStoreChange();
  }

  storeSubs: any;
  getAllStore(providerServiceMapID: any) {
    this.storeSubs = this.storeMappingService
      .getAllStore(providerServiceMapID)
      .subscribe(
        (response: any) => {
          console.log(response.data, 'storelist');
          this.storeList = response.data.filter(
            (item: any) => !item.facilityDeleted,
          );
          this.getParkingPlace(this.providerServiceMapID);
        },
        (err) => {
          this.notificationService.alert(err, 'error');
          console.error('error in fetching store');
        },
      );
  }

  parkingSubs: any;
  getParkingPlace(providerServiceMapID: any) {
    this.parkingSubs = this.storeMappingService
      .getAllParkingPlace(providerServiceMapID)
      .subscribe(
        (response: any) => {
          console.log(response.data, 'Parkinglist');
          this.mainParkingPlaceList = response.data.filter(
            (item: any) => !item.deleted,
          );
          this.parkingPlaceList = response.data.filter(
            (item: any) => !item.deleted,
          );
        },
        (err) => {
          this.notificationService.alert(err, 'error');
          console.error('error in fetching parking place');
        },
      );
  }

  vanSubs: any;
  getVan(facilityID: any) {
    this.vanSubs = this.storeMappingService.getAllVan(facilityID).subscribe(
      (response: any) => {
        console.log(response.data, 'Vanlist');
        this.vanList = response.data.filter(
          (item: any) => !item.facilityID && !item.deleted,
        );
        if (this.vanList.length === 0)
          this.notificationService.alert(
            'Van is not available in this parking place',
          );
      },
      (err) => {
        this.notificationService.alert(err, 'error');
        console.error('error in fetching van');
      },
    );
  }

  switchToViewMode() {
    this.modeChange.emit('view');
  }

  subscribeToMainStoreChange() {
    const temp: any = this.storeMappingForm.controls[
      'storeMapping'
    ] as FormGroup;
    temp.controls['facilityName'].valueChanges.subscribe((value: any) => {
      if (this.serviceID === 4) {
        this.parkAndHub = 'Hub';
        this.vanAndSpoke = 'Spoke';
      } else {
        this.parkAndHub = 'Parking Place';
        this.vanAndSpoke = 'Van';
      }
      if (value && value.data.parkingPlaceID) {
        const temp: any = this.mainParkingPlaceList.filter(
          (item: any) => item.parkingPlaceID === value.parkingPlaceID,
        );
        if (temp.length > 0)
          (<FormGroup>this.storeMappingForm.controls['storeMapping']).controls[
            'parkingPlaceName'
          ].setValue(temp[0]);

        this.subStoreList = this.storeList.filter(
          (item: any) =>
            item.mainFacilityID === value.facilityID &&
            item.isMainFacility === false &&
            !item.vanID,
        );
        if (this.subStoreList.length === 0)
          this.notificationService.alert('All substore mapped');
      } else if (value && this.isMainFacility === false) {
        this.notificationService.alert('No Parking Place mapped');
        (<FormGroup>this.storeMappingForm.controls['storeMapping']).controls[
          'parkingPlaceName'
        ].setValue(null);
      }
    });
  }

  subscribeToSubStoreChange() {
    const temp: any = this.storeMappingForm.controls[
      'storeMapping'
    ] as FormGroup;
    temp.controls['subFacilityName'].valueChanges.subscribe((value: any) => {
      if (value) {
        this.getVan(value.data.mainFacilityID);
      }
    });
  }

  subscribeToStoreSelectionChange() {
    const temp: any = this.storeMappingForm.controls[
      'storeMapping'
    ] as FormGroup;
    temp.controls['isMainFacility'].valueChanges.subscribe((value: any) => {
      if (value) {
        this.mainStoreList = this.storeList.filter(
          (item: any) => !item.parkingPlaceID && item.isMainFacility,
        );
        this.parkingPlaceList = this.mainParkingPlaceList.filter(
          (item: any) => !item.facilityID,
        );
      } else {
        this.mainStoreList = this.storeList.filter(
          (item: any) => item.isMainFacility,
        );
        this.parkingPlaceList = this.mainParkingPlaceList.slice();
      }
      this.resetForm();
    });
  }

  resetForm(facility?: any, subFacility?: any, parkingPlace?: any, van?: any) {
    const temp: any = this.storeMappingForm.controls[
      'storeMapping'
    ] as FormGroup;
    temp.controls['facilityID'].reset();
    temp.controls['facilityName'].reset();
    temp.controls['subFacilityID'].reset();
    temp.controls['subFacilityName'].reset();
    temp.controls['parkingPlaceID'].reset();
    temp.controls['parkingPlaceName'].reset();
    temp.controls['vanID'].reset();
    temp.controls['vanName'].reset();
  }

  checkValidity() {
    const temp: any = this.storeMappingForm.controls['storeMapping'].value;

    if (temp.isMainFacility) {
      if (temp.facilityName && temp.parkingPlaceName) return true;
      else return false;
    } else {
      if (
        temp.facilityName &&
        temp.parkingPlaceName &&
        temp.subFacilityName &&
        temp.vanName
      )
        return true;
      else return false;
    }
  }

  createStoreMappingForm() {
    return this.fb.group({
      service: null,
      state: null,
      storeMapping: this.fb.group({
        isMainFacility: undefined,
        facilityID: undefined,
        facilityName: undefined,
        subFacilityID: undefined,
        subFacilityName: undefined,
        parkingPlaceID: undefined,
        parkingPlaceName: undefined,
        vanID: undefined,
        vanName: undefined,
      }),
    });
  }

  addToStoreMappingList() {
    const temp: any = JSON.parse(
      JSON.stringify(this.storeMappingForm.value.storeMapping),
    );
    this.tempParkingPlaceName = undefined;
    if (temp && temp.facilityName && this.isMainFacility) {
      temp.facilityID = temp.facilityName.facilityID;
      temp.facilityName = temp.facilityName.facilityName;
    }

    if (temp && temp.subFacilityName && !this.isMainFacility) {
      temp.facilityID = temp.subFacilityName.facilityID;
      temp.facilityName = temp.subFacilityName.facilityName;
      temp.subFacilityID = undefined;
      temp.subFacilityName = undefined;
    }

    if (temp && temp.parkingPlaceName && this.isMainFacility) {
      temp.parkingPlaceID = temp.parkingPlaceName.parkingPlaceID;
      temp.parkingPlaceName = temp.parkingPlaceName.parkingPlaceName;
    }

    if (temp && temp.vanName && !this.isMainFacility) {
      temp.vanID = temp.vanName.vanID;
      temp.vanName = temp.vanName.vanName;
      this.tempParkingPlaceName = temp.parkingPlaceName.parkingPlaceName;
      temp.parkingPlaceID = undefined;
      temp.parkingPlaceName = undefined;
    }

    if (temp) {
      const arr: any = this.storeMappingList.data.filter(
        (item: any) =>
          (temp.facilityID !== undefined &&
            item.facilityID === temp.facilityID) ||
          (temp.parkingPlaceID !== undefined &&
            item.parkingPlaceID === temp.parkingPlaceID) ||
          (temp.vanID !== undefined && item.vanID === temp.vanID),
      );
      if (arr.length === 0) {
        if (this.tempParkingPlaceName !== undefined) {
          temp.parkingPlaceName = this.tempParkingPlaceName;
        }
        this.storeMappingList.data.push(temp);
        this.storeMappingList.paginator = this.paginator;
      } else {
        this.notificationService.alert('Already added');
      }
      this.storeMappingForm.controls['storeMapping'].reset();
    }
  }

  deleteFromStoreList(i: any) {
    this.storeMappingList.data.splice(i, 1);
  }

  submitStoreMapping() {
    const temp: any = this.storeMappingList.data.slice();

    temp.forEach((item: any) => {
      item.createdBy = this.createdBy;
    });
    console.log(JSON.stringify(temp, null, 4));
    this.storeMappingService.postStoreMapping(temp).subscribe(
      (response: any) => {
        if (response) {
          this.notificationService.alert('Saved successfully', 'success');
          this.switchToViewMode();
        }
      },
      (err) => {
        this.notificationService.alert(err, 'error');
      },
    );
  }

  get isMainFacility() {
    return (<FormGroup>this.storeMappingForm.controls['storeMapping']).controls[
      'isMainFacility'
    ].value;
  }
}
