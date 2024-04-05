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
import { SnomedMasterService } from '../configurations/services/snomed-master.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-snomed-code-search',
  templateUrl: './snomed-code-search.component.html',
  styleUrls: ['./snomed-code-search.component.css'],
})
export class SnomedCodeSearchComponent implements OnInit {
  searchTerm: any;

  // snomedData = [];
  pageCount: any;
  currentPage = 1;
  pager: any = {
    totalItems: 0,
    currentPage: 0,
    totalPages: 0,
    startPage: 0,
    endPage: 0,
    pages: 0,
  };
  displayedColumns = ['conceptID', 'term', 'selectedItem'];
  pagedItems = [];
  placeHolderSearch: any;
  current_language_set: any;

  selectedTerm: any = null;
  selectedSnomedNo: any;
  message = '';
  selectedItem: any;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  dataSource = new MatTableDataSource<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public input: any,
    public dialogRef: MatDialogRef<SnomedCodeSearchComponent>,
    private SnomedMasterServiceService: SnomedMasterService,
  ) {}

  ngOnInit() {
    this.search(this.input.searchTerm, 0);
  }

  selectSnomedCode(snomedNo: any, snomedTerm: any) {
    this.selectedTerm = null;
    this.selectedSnomedNo = snomedNo;
    this.selectedTerm = snomedTerm;
    this.selectedItem = snomedNo;
  }

  submitComponentList() {
    const reqObj = {
      snomedNo: this.selectedSnomedNo,
      snomedTerm: this.selectedTerm,
    };
    this.dialogRef.close(reqObj);
  }
  showProgressBar = false;
  search(term: string, pageNo: number): void {
    if (term.length > 2) {
      this.showProgressBar = true;
      this.SnomedMasterServiceService.searchSnomedRecord(
        term,
        pageNo,
      ).subscribe(
        (res: any) => {
          if (res.statusCode === 200) {
            this.showProgressBar = false;
            if (res.data && res.data.sctMaster.length > 0) {
              this.showProgressBar = true;
              this.dataSource.data = res.data.sctMaster;
              this.dataSource.paginator = this.paginator;
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
    this.dataSource.data = [];
    this.dataSource.paginator = this.paginator;
    this.pageCount = null;
    this.pager = {
      totalItems: 0,
      currentPage: 0,
      totalPages: 0,
      startPage: 0,
      endPage: 0,
      pages: 0,
    };
  }
}
