import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ConfirmationDialogsService } from 'src/app/core/services/dialog/confirmation.service';
import { InstituteDirectoryMasterComponent } from '../institute-directory-master/institute-directory-master.component';
import { InstituteDirectoryMasterService } from '../../services/institute-directory-master-service.service';
import { dataService } from 'src/app/core/services/dataService/data.service';

@Component({
  selector: 'app-edit-institute-directory',
  templateUrl: './edit-institute-directory-model.html',
  styleUrls: ['./edit-institute-directory.component.css'],
})
// @Component({
// 	selector: 'edit-institute-directory',
// 	templateUrl: './edit-institute-directory-model.html'
// })
export class EditInstituteDirectoryComponent implements OnInit {
  instituteDirectory: any;
  description: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public instituteDirectoryService: InstituteDirectoryMasterService,
    public instituteDirectoryMasterComponent: InstituteDirectoryMasterComponent,
    public commonDataService: dataService,
    public alertService: ConfirmationDialogsService,
    public dialogReff: MatDialogRef<EditInstituteDirectoryComponent>,
  ) {}

  ngOnInit() {
    console.log('dialog data', this.data);
    this.instituteDirectory = this.data.instituteDirectoryName;
    this.description = this.data.instituteDirectoryDesc;
  }

  update(edited_directory_name: any, edited_description: any) {
    const obj = {
      instituteDirectoryID: this.data.instituteDirectoryID,
      instituteDirectoryName: edited_directory_name,
      instituteDirectoryDesc: edited_description,
      modifiedBy: this.commonDataService.uname,
    };
    this.instituteDirectoryService.editInstituteDirectory(obj).subscribe(
      (response: any) => this.updateSuccessHandeler(response),
      (err: any) => {
        console.log('Error', err);
        // this.alertService.alert(err, 'error')
      },
    );
  }

  updateSuccessHandeler(response: any) {
    console.log(response, 'edit response success');
    if (response) {
      this.dialogReff.close('success');
    }
  }
}
