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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Observable, Subject } from 'rxjs';
import { ComponentMasterServiceService } from 'src/app/core/services/ProviderAdminServices/component-master-service.service';

@Component({
  selector: 'app-component-name-search',
  templateUrl: './component-name-search.component.html',
  styleUrls: ['./component-name-search.component.css'],
})
export class ComponentNameSearchComponent implements OnInit {
  searchTerm!: string;
  placeHolderSearch: any;
  current_language_set: any;

  selectedComponent: any = null;
  selectedComponentNo: any;
  message = '';
  selectedItem: any;
  displayedColumns = [
    'loinc_Num',
    'component',
    'system',
    'class1',
    'long_common_name',
    'radiobutton',
  ];

  components = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public input: any,
    public dialogRef: MatDialogRef<ComponentNameSearchComponent>,
    private componentMasterServiceService: ComponentMasterServiceService,
  ) {}

  ngOnInit() {
    this.search(this.input.searchTerm, 0);
  }

  selectComponentName(item: any, component: any) {
    this.selectedComponent = null;

    this.selectedComponentNo = item;
    this.selectedComponent = component;
    console.log('selectedComponent', this.selectedComponent);
    this.selectedItem = item;
  }

  submitComponentList() {
    const reqObj = {
      componentNo: this.selectedComponentNo,
      component: this.selectedComponent,
    };
    this.dialogRef.close(reqObj);
  }
  showProgressBar = false;
  search(term: string, pageNo: any): void {
    // this.selectedComponent=null;
    if (term.length > 2) {
      this.showProgressBar = true;
      this.componentMasterServiceService
        .searchComponent(term, pageNo)
        .subscribe(
          (res: any) => {
            if (res.statusCode === 200) {
              this.showProgressBar = false;
              if (res.data && res.data.lonicMaster.length > 0) {
                this.showProgressBar = true;
                this.components.data = res.data.lonicMaster;
                this.components.paginator = this.paginator;
                this.showProgressBar = false;
              } else {
                this.message = 'No Record Found';
              }
            } else {
              this.resetData();
              this.showProgressBar = false;
            }
          },
          (err) => {
            this.resetData();
            this.showProgressBar = false;
          },
        );
    }
  }

  resetData() {
    this.components.data = [];
    this.components.paginator = this.paginator;
  }

  // setEnable()
  // {
  //   this.selectedComponent=null;
  // }
}
