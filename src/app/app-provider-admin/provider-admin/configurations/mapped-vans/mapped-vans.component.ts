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
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogsService } from 'src/app/core/services/dialog/confirmation.service'; 
import { EmployeeParkingPlaceMappingService } from '../../activities/services/employee-parking-place-mapping.service'; 
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-mapped-vans',
  templateUrl: './mapped-vans.component.html',
  styleUrls: ['./mapped-vans.component.css']
})
export class MappedVansComponent implements OnInit {
  [x: string]: any;
  mappedVans = new MatTableDataSource<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

    displayedColumns1: string[] = [
      'SNo',
      'vanName',
      'edit',
    ];

  // mappedVans: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public input: any,
    public dialogRef: MatDialogRef<MappedVansComponent>,
    private employeeParkingPlaceMappingService: EmployeeParkingPlaceMappingService,
    private confirmationDialogsService: ConfirmationDialogsService) { }

  ngOnInit() {
    console.log("input", this.input)
      this.showVanList(this.input.vanListDetails);
  }

  showVanList(vanListDetails:any) {
    this.employeeParkingPlaceMappingService.getMappedVansList(vanListDetails.userParkingPlaceMapID).subscribe((response:any) => {
      if (response.statusCode == 200 && response.data != undefined) {
        this.mappedVans.data = response.data;
      }
    }, (err) => {
      this.confirmationDialogsService.alert(err.errorMessage);
    });
  }
  removeVan(index:any, item:any) {
    this.mappedVans.data.splice(index, 1);
    let removeItemObj = {
      "userVanMapID": item.userVanMapID,
      "modifiedBy": item.createdBy
    }
    this.employeeParkingPlaceMappingService.removeMappedVan(removeItemObj).subscribe((removedItemResponse:any) => {
      if (removedItemResponse.statusCode == 200) {
        this.confirmationDialogsService.alert("Deleted Successfully", 'success');
      }
    }, (err) => {
      this.confirmationDialogsService.alert(err.errorMessage);
    });

  }
}
