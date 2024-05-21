import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddFieldsService } from '../services/add-fields-service';
import { ConfirmationDialogsService } from 'src/app/core/services/dialog/confirmation.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectConfigutationScreenComponent } from '../project-configutation-screen/project-configutation-screen.component';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-add-fields-to-project',
  templateUrl: './add-fields-to-project.component.html',
  styleUrls: ['./add-fields-to-project.component.css'],
})
export class AddFieldsToProjectComponent implements OnInit {
  dialogData: any;
  optionList: any = [];
  addFieldsForm!: FormGroup;
  selectable = true;
  removable = true;
  addOnBlur = true;
  showForm = false;
  enableUpdate = false;

  fieldTypesList: any = [];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  displayedColumns = [
    'rank',
    'fieldName',
    'fieldType',
    'placeholder',
    'edit',
    'delete',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  dataSource = new MatTableDataSource<any>();
  addedFields: any;

  constructor(
    private addFieldsService: AddFieldsService,
    private confirmationService: ConfirmationDialogsService,
    @Inject(MAT_DIALOG_DATA) public input: any,
    public dialogRef: MatDialogRef<ProjectConfigutationScreenComponent>,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    console.log('data', this.input);
    this.dialogData = this.input;
    this.fetchAddedFields();
  }

  createAddFormFieldsForm() {
    return (this.addFieldsForm = this.fb.group({
      rank: null,
      fieldName: null,
      fieldType: null,
      placeholder: null,
      options: null,
      isRequired: null,
      allowText: null,
      allowMin: null,
      allowMax: null,
      isEditable: true,
    }));
  }

  fetchAddedFields() {
    const reqObj = {
      sectionId: this.dialogData.sectionId,
      serviceProviderId: sessionStorage.getItem('service_providerID'),
    };
    this.addFieldsService.fetchFields(reqObj).subscribe(
      (res: any) => {
        if (res && res.data && res.statusCode === 200) {
          this.addedFields = res.data.fields;
          this.dataSource.data = res.data.fields;
          this.dataSource.paginator = this.paginator;
        } else {
          this.confirmationService.alert(res.errorMessage, 'error');
        }
      },
      (err: any) => {
        this.confirmationService.alert(err.errorMessage, 'error');
      },
    );
  }

  filterComponentList(searchTerm?: string) {
    if (!searchTerm) {
      this.dataSource.data = this.addedFields;
      this.dataSource.paginator = this.paginator;
    } else {
      this.dataSource.data = [];
      this.dataSource.paginator = this.paginator;
      this.addedFields.forEach((item: any) => {
        for (const key in item) {
          if (
            key === 'fieldName' ||
            key === 'fieldType' ||
            key === 'placeholder'
          ) {
            const value: string = '' + item[key];
            if (value.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
              this.dataSource.data.push(item);
              break;
            }
            this.dataSource.paginator = this.paginator;
          }
        }
      });
    }
  }

  patchDetails(item: any) {
    this.createAddFormFieldsForm();
    this.showForm = true;
    this.enableUpdate = true;
    this.addFieldsForm.patchValue(item);
    console.log('addfieldsform', this.addFieldsForm.value);
  }
  updateFields(item: any, deleted: any) {
    if (deleted !== null) {
      const reqObj = {
        isRequired: item.isRequired,
        fieldName: item.fieldName,
        deleted: deleted,
        isEditable: item.isEditable,
        allowMin: item.allowMin,
        rank: item.rank,
        allowMax: item.allowMax,
        allowText: item.allowText,
        placeholder: item.placeholder,
        fieldType: item.fieldType,
        fieldTypeId: item.fieldTypeId,
      };
      this.addFieldsService.updateFields(reqObj).subscribe(
        (res: any) => {
          if (res && res.data && res.statusCode === 200) {
            if (deleted) {
              this.confirmationService.alert(
                'Field deactivated successfully',
                'success',
              );
            } else {
              this.confirmationService.alert(
                'Field activated successfully',
                'success',
              );
            }
          } else {
            this.confirmationService.alert(res.errorMessage, 'error');
          }
        },
        (err: any) => {
          this.confirmationService.alert(err.errorMessage, 'error');
        },
      );
    } else {
      const reqObj = {
        isRequired: this.addFieldsForm.get('isRequired')?.value,
        fieldName: this.addFieldsForm.get('isRequired')?.value,
        deleted: false,
        isEditable: this.addFieldsForm.get('isEditable')?.value,
        allowMin: this.addFieldsForm.get('allowMin')?.value,
        rank: this.addFieldsForm.get('rank')?.value,
        allowMax: this.addFieldsForm.get('allowMax')?.value,
        allowText: this.addFieldsForm.get('allowText')?.value,
        placeholder: this.addFieldsForm.get('placeholder')?.value,
        fieldType: this.addFieldsForm.get('fieldType')?.value,
        fieldTypeId: this.addFieldsForm.get('fieldTypeId')?.value,
        modifiedBy: sessionStorage.getItem('uname'),
        serviceProviderId: sessionStorage.getItem('service_providerID'),
      };
      this.addFieldsService.updateFields(reqObj).subscribe(
        (res: any) => {
          if (res && res.data && res.statusCode === 200) {
            if (deleted) {
              this.confirmationService.alert(
                'Field deactivated successfully',
                'success',
              );
            } else {
              this.confirmationService.alert(
                'Field activated successfully',
                'success',
              );
            }
          } else {
            this.confirmationService.alert(res.errorMessage, 'error');
          }
        },
        (err: any) => {
          this.confirmationService.alert(err.errorMessage, 'error');
        },
      );
    }
  }

  /**
   * Adding Options
   * @param event
   */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      if (!this.optionList.includes(value.trim())) {
        if (
          this.addFieldsForm.controls['fieldType'].value === 'radio' &&
          this.optionList.length >= 2
        ) {
          this.confirmationService.alert(
            'Radio button can have only 2 options, Please choose Multi select/dropdown for more options',
            'info',
          );
        } else {
          this.optionList.push(value.trim());
        }
        // let optionObj = {
        //   "id": null,
        //   "options": value.trim(),
        //   "questionId": this.editQuestionnaireForm.controls['questionnaireId'].value,
        //   "psmId": sessionStorage.getItem('providerServiceMapID'),
        //   "deleted": false,
        //   "createdBy": sessionStorage.getItem("userName"),
        // };
        // this.finalOptionList.push(optionObj);
        // this.editQuestionnaireForm.markAsDirty();
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /**
   * Removing Options
   * @param optionValues
   */
  remove(optionValues: any): void {
    const index = this.optionList.indexOf(optionValues);

    if (index >= 0) {
      this.optionList.splice(index, 1);
      // this.finalOptionList.splice(index, 1);
      // this.editQuestionnaireForm.markAsDirty();
    }
  }

  enableForm() {
    this.showForm = true;
    this.createAddFormFieldsForm();
    this.getFieldTypes();
  }

  createField() {
    const form = this.addFieldsForm.value;
    const reqObj = {
      sectionId: this.dialogData.sectionId,
      serviceProviderId: sessionStorage.getItem('service_providerID'),
      createdBy: sessionStorage.getItem('uname'),
      fields: [form],
    };
    console.log('reqObj', reqObj);
    this.addFieldsService.saveFields(reqObj).subscribe(
      (res: any) => {
        if (res && res.statusCode === 200) {
          this.confirmationService.alert(
            'Field Created Successfully',
            'success',
          );
          this.addFieldsForm.reset();
          this.showForm = false;
          this.fetchAddedFields();
        } else this.confirmationService.alert(res.errorMessage, 'error');
      },
      (err: any) => {
        this.confirmationService.alert(err.errorMessage, 'error');
      },
    );
  }

  getFieldTypes() {
    this.addFieldsService.getFieldTypes().subscribe(
      (res: any) => {
        if (res && res.data && res.statusCode === 200) {
          this.fieldTypesList = res.data;
        } else {
          this.confirmationService.alert(res.errorMessage, 'error');
        }
      },
      (err: any) => {
        this.confirmationService.alert(err.errorMessage, 'error');
      },
    );
  }

  validateRank() {
    const rank = this.addFieldsForm.get('rank')?.value;
    const exists = this.dataSource.data.find((item: any) => item.rank === rank);
    if (exists) {
      this.confirmationService.alert('Rank already exists', 'error');
      this.addFieldsForm.controls['rank'].patchValue(null);
    }
  }

  resetOptionsOnChange() {
    const fieldType = this.addFieldsForm.controls['fieldType'].value;
    if (
      fieldType !== 'dropdown' &&
      fieldType !== 'multiSelect' &&
      fieldType !== 'radio'
    ) {
      this.addFieldsForm.get('options')?.reset();
      this.optionList = [];
    }
  }
}
