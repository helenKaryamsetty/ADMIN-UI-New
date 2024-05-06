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
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProviderAdminRoleService } from '../../activities/services/state-serviceline-role.service';
import { dataService } from 'src/app/core/services/dataService/data.service';
import { VanServicePointMappingService } from 'src/app/core/services/ProviderAdminServices/van-service-point-mapping.service';
import { ConfirmationDialogsService } from 'src/app/core/services/dialog/confirmation.service';
import { FormsModule, NgForm } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-van-service-point-mapping',
  templateUrl: './van-service-point-mapping.component.html',
})
export class VanServicePointMappingComponent implements OnInit {
  // [x: string]: any;
  filteredsearchResultArray = new MatTableDataSource<any>();
  // bufferArray = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  displayedColumns: string[] = [
    'sNo',
    'servicePoint',
    'district',
    'talukSubDistrict',
    'morning',
    'evening',
    'fullDay',
  ];

  showTable = false;
  userID: any;
  service: any;
  state: any;
  vanTypeID: any;
  parkingPlaceObj: any;
  obj: any;
  vanObj: any = {};
  createdBy: any;
  showVanServicePointMappings: any = true;
  data: any;
  providerServiceMapID: any;
  provider_states: any;
  provider_services: any;
  service_provider_id: any;
  editable: any = false;
  countryID: any;
  district: any;
  parking_place: any;
  zoneID: any;
  talukID: any;
  parkingPlaceID: any;
  parkAndHub: any;
  vanAndSpoke: any;
  code: any;
  codeType: any;
  serviceID: any;

  filteredVanTypes: any = [];
  availableVanNames: any = [];

  formBuilder: FormBuilder = new FormBuilder();
  MappingForm!: FormGroup;

  /*arrays*/
  services: any = [];
  states: any = [];
  districts: any = [];
  parkingPlaces: any = [];
  availableVanTypes: any = [];
  availableVans: any = [];
  zones: any = [];
  taluks: any = [];

  @ViewChild('searForm1')
  searForm1!: NgForm;
  @ViewChild('searchDistrictsForm')
  searchDistrictsForm!: NgForm;
  disableSelection: any;

  constructor(
    public providerAdminRoleService: ProviderAdminRoleService,
    public commonDataService: dataService,
    public vanServicePointMappingService: VanServicePointMappingService,
    private alertMessage: ConfirmationDialogsService,
  ) {
    this.data = [];
    this.service_provider_id = sessionStorage.getItem('service_providerID');
    this.countryID = 1; // hardcoded as country is INDIA
    this.serviceID = this.commonDataService.serviceIDMMU;
    this.createdBy = this.commonDataService.uname;
  }

  ngOnInit() {
    this.userID = this.commonDataService.uid;
    this.MappingForm = this.formBuilder.group({
      mappings: this.formBuilder.array([]),
    });
    this.getServiceLines();
  }

  getServiceLines() {
    this.vanServicePointMappingService
      .getServiceLinesNew(this.userID)
      .subscribe((response: any) => {
        this.getServicesSuccessHandeler(response),
          (err: any) => {
            console.log('ERROR in fetching serviceline', err);
            // this.alertMessage.alert(err, 'error');
          };
      });
  }
  getServicesSuccessHandeler(response: any) {
    this.services = response.data;
  }
  getStates(value: any) {
    this.resetArrays();
    this.zones = [];
    this.parkingPlaces = [];
    if (value.serviceID === 4) {
      this.parkAndHub = 'Hub';
      this.vanAndSpoke = 'Spoke';
      this.code = 'Spoke Code';
      this.codeType = 'Spoke Type';
    } else {
      this.parkAndHub = 'Parking Place';
      this.vanAndSpoke = 'Van';
      this.code = 'Vehicle No.';
      this.codeType = 'Van Type';
    }
    const obj = {
      userID: this.userID,
      serviceID: value.serviceID,
      isNational: value.isNational,
    };
    this.vanServicePointMappingService
      .getStatesNew(obj)
      .subscribe((response: any) => {
        this.getStatesSuccessHandeler(response),
          (err: any) => {
            console.log('error in fetching states', err);
          };
        //this.alertMessage.alert(err, 'error');
      });
  }

  getStatesSuccessHandeler(response: any) {
    this.states = response.data;
  }
  resetArrays() {
    this.searForm1.resetForm();
    this.taluks = [];
    this.availableVans = [];
    this.MappingForm = this.formBuilder.group({
      mappings: this.formBuilder.array([]),
    });
  }
  setProviderServiceMapID(providerServiceMapID: any) {
    this.availableVanServicePointMappings = [];
    this.resetFieldsOnStateChange();
    this.providerServiceMapID = providerServiceMapID;
    this.getAvailableZones(this.providerServiceMapID);
  }
  getAvailableZones(providerServiceMapID: any) {
    this.vanServicePointMappingList = [];
    this.vanServicePointMappingService
      .getZones({ providerServiceMapID: providerServiceMapID })
      .subscribe((response: any) => this.getZonesSuccessHandler(response));
  }
  getZonesSuccessHandler(response: any) {
    if (response.data !== undefined) {
      for (const zone of response.data) {
        if (!zone.deleted) {
          this.zones.push(zone);
        }
      }
    }
  }
  getParkingPlaces(zoneID: any, providerServiceMapID: any) {
    this.resetArrays();
    const parkingPlaceObj = {
      zoneID: zoneID,
      providerServiceMapID: providerServiceMapID,
    };
    this.vanServicePointMappingService
      .getParkingPlaces(parkingPlaceObj)
      .subscribe((response: any) =>
        this.getParkingPlaceSuccessHandler(response),
      );
  }

  getParkingPlaceSuccessHandler(response: any) {
    this.parkingPlaces = response.data;
    this.reseArray();
    for (const parkingPlaces of this.parkingPlaces) {
      if (parkingPlaces.deleted) {
        const index: number = this.parkingPlaces.indexOf(parkingPlaces);
        if (index !== -1) {
          this.parkingPlaces.splice(index, 1);
        }
      }
    }
  }
  getVanTypes() {
    this.obj = {};
    this.obj.providerServiceMapID = this.providerServiceMapID;
    this.vanServicePointMappingService
      .getVanTypes(this.obj)
      .subscribe((response: any) => this.getVanTypesSuccessHandler(response));
  }

  getVanTypesSuccessHandler(response: any) {
    this.availableVanTypes = response.data;
    this.filteredVanTypes = [];
    this.availableVanTypes.filter((vanTypes: any) => {
      if (this.service.serviceName === 'TM' && vanTypes.vanTypeID === 3) {
        this.filteredVanTypes.push(vanTypes);
      } else if (
        this.service.serviceName === 'MMU' &&
        vanTypes.vanTypeID !== 3
      ) {
        this.filteredVanTypes.push(vanTypes);
      } else if (
        this.service.serviceName === 'HWC' &&
        vanTypes.vanTypeID !== 3
      ) {
        this.filteredVanTypes.push(vanTypes);
      }
    });
    this.availableVanServicePointMappings = [];
    this.reseArray();
  }

  getVans(providerServiceMapID: any, parkingPlaceID: any, vanTypeID: any) {
    this.MappingForm = this.formBuilder.group({
      mappings: this.formBuilder.array([]),
    });
    this.vanObj = {};
    //this.vanObj.stateID = stateID;
    // this.vanObj.districtID = districtID;
    this.vanObj.parkingPlaceID = parkingPlaceID;
    this.vanObj.vanTypeID = vanTypeID;
    this.vanObj.providerServiceMapID = providerServiceMapID;
    this.vanServicePointMappingService
      .getVans(this.vanObj)
      .subscribe((response: any) => this.getVanSuccessHandler(response));
  }

  getVanSuccessHandler(response: any) {
    this.availableVans = response.data;
    this.vanID = undefined;
    this.reseArray();
    for (const availableVan of this.availableVans) {
      this.availableVanNames.push(availableVan.vanName);
    }
  }
  vanServicePointMappingSuccessHandler(response: any) {
    this.vanServicePointMappingList = [];
    this.alertMessage.alert('Mapping saved successfully', 'success');
  }

  getVanServicePointMappings(parkingPlaceID: any, vanID: any) {
    console.log('van service point mapping', parkingPlaceID, vanID);
    this.vanObj = {};
    // this.vanObj.stateID = stateID;
    // this.vanObj.districtID = districtID;
    this.vanObj.parkingPlaceID = parkingPlaceID;
    this.vanObj.vanID = vanID;
    this.vanObj.providerServiceMapID = this.providerServiceMapID;
    this.vanServicePointMappingService
      .getVanServicePointMappings(this.vanObj)
      .subscribe((response: any) =>
        this.getVanServicePointMappingsSuccessHandler(response),
      );
  }

  availableVanServicePointMappings: any = [];
  remainingMaps: any = [];
  reseArray() {
    const temp = this.MappingForm.controls['mappings'] as FormArray;
    temp.reset();
    temp.removeAt(0);
  }

  getVanServicePointMappingsSuccessHandler(response: any) {
    this.showTable = true;
    this.availableVanServicePointMappings = [];
    this.availableVanServicePointMappings = response.data;
    console.log('response', response);
    console.log('response.data', response.data);
    const temp: any = this.MappingForm.controls['mappings'] as FormArray;
    this.filteredsearchResultArray.data = response.data;
    // this.filteredsearchResultArray.data = response.data;
    console.log(
      'this.filteredsearchResultArray.data',
      this.filteredsearchResultArray.data,
    );
    temp.reset();
    this.servicePointIDList = [];
    console.log('temp', temp);
    const tempLength = temp.length;
    if (tempLength > 0) {
      for (let i = 0; i <= tempLength; i++) {
        temp.removeAt(0);
      }
    }

    const remainarray: any = [];

    for (let i = 0; i < this.availableVanServicePointMappings.length; i++) {
      if (
        this.availableVanServicePointMappings[i].vanID === undefined ||
        this.availableVanServicePointMappings[i].vanID === null ||
        this.vanID === this.availableVanServicePointMappings[i].vanID
      ) {
        this.servicePointIDList.push(
          this.availableVanServicePointMappings[i].servicePointID,
        );
        temp.push(this.createItem(this.availableVanServicePointMappings[i]));
      } else {
        remainarray.push(this.availableVanServicePointMappings[i]);
      }
    }
    this.remainingMaps = remainarray;
    for (let i = 0; i < this.remainingMaps.length; i++) {
      if (
        this.servicePointIDList.indexOf(
          this.remainingMaps[i].servicePointID,
        ) === -1 ||
        this.servicePointIDList.indexOf(
          this.remainingMaps[i].servicePointID,
        ) === null
      ) {
        this.servicePointIDList.push(this.remainingMaps[i].servicePointID);
        temp.push(this.createItem(this.remainingMaps[i]));
      }
    }
  }

  servicePointIDList: any = [];
  createItem(obj: any): FormGroup {
    let vanSession: any = '';
    let vanServicePointMapID: any;
    if (this.vanID === obj.vanID || obj.vanID === undefined) {
      vanSession = obj.vanSession;
      vanServicePointMapID = obj.vanServicePointMapID;
    }
    return this.formBuilder.group({
      vanServicePointMapID: vanServicePointMapID,
      vanID: this.vanID,
      servicePointID: obj.servicePointID,
      servicePointName: obj.servicePointName,
      districtID: obj.districtID,
      districtName: obj.districtName,
      blockID: obj.blockID,
      blockName: obj.blockName,
      vanSession: vanSession,
      providerServiceMapID: obj.providerServiceMapID,
      deleted: obj.deleted,
      isChanged: '',
      vanSession1: vanSession === '1' || vanSession === '3',
      vanSession2: vanSession === '2' || vanSession === '3',
      vanSession3: vanSession === '3',
    });
  }

  vanID: any;
  selectedVan(van: any) {
    (this.vanID = van.vanID),
      // this.district = van.districtID,
      (this.parkingPlaceID = van.parkingPlaceID);
  }

  vanServicePointMappingObj: any;
  vanServicePointMappingList: any = [];
  storeVanServicePointMapping() {
    console.log(this.MappingForm.value);
    const mappings = this.MappingForm.value.mappings;
    const mappingArray = <FormArray>this.MappingForm.controls['mappings'];
    for (let i = 0; i < mappings.length; i++) {
      const mappingGroup = <FormGroup>mappingArray.controls[i];

      console.log(mappingGroup.controls['vanSession1'].touched);
      if (
        mappingGroup.controls['vanSession1'].touched ||
        mappingGroup.controls['vanSession2'].touched
      ) {
        this.vanServicePointMappingObj = {};
        this.vanServicePointMappingObj.vanServicePointMapID =
          mappings[i].vanServicePointMapID;
        this.vanServicePointMappingObj.vanID = this.vanID;
        this.vanServicePointMappingObj.servicePointID =
          mappings[i].servicePointID;
        if (mappings[i].vanSession1) {
          this.vanServicePointMappingObj.vanSession = 1;
        }
        if (mappings[i].vanSession2) {
          this.vanServicePointMappingObj.vanSession = 2;
        }
        if (mappings[i].vanSession1 && mappings[i].vanSession2) {
          this.vanServicePointMappingObj.vanSession = 3;
        }
        this.vanServicePointMappingObj.providerServiceMapID =
          this.providerServiceMapID;

        this.vanServicePointMappingObj.createdBy = this.createdBy;

        this.vanServicePointMappingList.push(this.vanServicePointMappingObj);
      }
    }
    const obj = { vanServicePointMappings: this.vanServicePointMappingList };
    this.vanServicePointMappingService
      .saveVanServicePointMappings(obj)
      .subscribe((response: any) => this.saveMappingSuccessHandler(response));
  }

  saveMappingSuccessHandler(response: any) {
    if (response.data.length > 0) {
      this.getVanServicePointMappings(
        this.parking_place.parkingPlaceID,
        this.vanID,
      );
      this.alertMessage.alert('Mapping saved successfully', 'success');
    }
  }
  resetFieldsOnStateChange() {
    this.searchDistrictsForm.resetForm();
    this.searForm1.resetForm();
    this.zones = [];
    this.districts = [];
    this.parkingPlaces = [];
    this.taluks = [];
    this.availableVans = [];
    this.MappingForm = this.formBuilder.group({
      mappings: this.formBuilder.array([]),
    });
  }
  resetFields() {
    this.searForm1.resetForm();
    this.availableVans = [];
    this.MappingForm = this.formBuilder.group({
      mappings: this.formBuilder.array([]),
    });
  }

  setvansession(i: any, value: any) {
    const mappingArray = <FormArray>this.MappingForm.controls['mappings'];
    const mappingGroup = <FormGroup>mappingArray.controls[i];
    mappingGroup.controls['vanSession1'].markAsTouched();
    mappingGroup.controls['vanSession2'].markAsTouched();

    mappingGroup.controls['vanSession1'].patchValue(!value);
    mappingGroup.controls['vanSession2'].patchValue(!value);
  }
}
