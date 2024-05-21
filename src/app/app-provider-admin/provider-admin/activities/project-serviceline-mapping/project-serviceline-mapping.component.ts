import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ProjectServicelineMappingService } from '../services/project-serviceline-mapping.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectMasterService } from '../services/project-master-service.service';
import { ConfirmationDialogsService } from 'src/app/core/services/dialog/confirmation.service';
import { dataService } from 'src/app/core/services/dataService/data.service';

@Component({
  selector: 'app-project-serviceline-mapping',
  templateUrl: './project-serviceline-mapping.component.html',
  styleUrls: ['./project-serviceline-mapping.component.css'],
})
export class ProjectServicelineMappingComponent implements OnInit {
  // state: any;
  // district: any;
  // block: any;
  // serviceline: any;
  // project: any;
  servicelines: any = [];
  states: any = [];
  districts: any = [];
  blocks: any = [];
  projectNames: any = [];

  // @ViewChild('projectServcelineMappingForm')
  // projectServcelineMappingForm!: NgForm;

  projectServcelineMappingForm!: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['sno', 'projectName', 'deleted'];
  enableProjectField = false;
  serviceProviderId: any;
  enableUpdate = false;

  constructor(
    private projectServicelineMappingService: ProjectServicelineMappingService,
    private confirmationService: ConfirmationDialogsService,
    private projectMasterService: ProjectMasterService,
    private dataService: dataService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.createProjectServicelineForm();
    this.serviceProviderId = this.dataService.service_providerID;
    this.getProviderServices();
    this.projectServcelineMappingForm.get('projectName')?.disable();
  }

  createProjectServicelineForm() {
    return (this.projectServcelineMappingForm = this.fb.group({
      id: null,
      serviceline: null,
      state: null,
      district: null,
      block: null,
      projectName: null,
      projectId: null,
    }));
  }

  getProviderServices() {
    const reqObj = {
      userID: sessionStorage.getItem('uid'),
    };
    this.projectServicelineMappingService.getServices(reqObj).subscribe(
      (res: any) => {
        if (res.data && res.statusCode === 200) {
          this.servicelines = this.filterServices(res.data);
          this.getStates();
        } else {
          this.confirmationService.alert(res.errorMessage, 'error');
        }
      },
      (err: any) => {
        this.confirmationService.alert(err.errorMessage, 'error');
      },
    );
  }

  filterServices(res: any) {
    const services: any = [];
    res.filter((item: any) => {
      if (item.serviceID === 4 || item.serviceID === 2 || item.serviceID === 9)
        services.push(item);
    });
    return services;
  }

  getStates() {
    this.projectServicelineMappingService.getStates().subscribe(
      (res: any) => {
        if (res.data && res.statusCode === 200) {
          this.states = res.data;
        } else {
          this.confirmationService.alert(res.errorMessage, 'error');
        }
      },
      (err: any) => {
        this.confirmationService.alert(err.errorMessage, 'error');
      },
    );
  }

  getDistricts() {
    this.projectServcelineMappingForm.controls['district'].patchValue(null);
    this.projectServcelineMappingForm.controls['block'].patchValue(null);
    this.projectServcelineMappingForm.controls['projectName'].patchValue(null);
    this.projectServcelineMappingForm.controls['projectId'].patchValue(null);
    this.dataSource.data = [];
    this.enableProjectField = false;
    const stateId =
      this.projectServcelineMappingForm.get('state')?.value.stateID;
    this.projectServicelineMappingService.getDistricts(stateId).subscribe(
      (res: any) => {
        if (res.data && res.statusCode === 200) {
          this.districts = res.data;
        } else {
          this.confirmationService.alert(res.errorMessage, 'error');
        }
      },
      (err: any) => {
        this.confirmationService.alert(err.errorMessage, 'error');
      },
    );
  }

  getBlocks() {
    this.projectServcelineMappingForm.controls['block'].patchValue(null);
    this.projectServcelineMappingForm.controls['projectId'].patchValue(null);
    this.projectServcelineMappingForm.controls['projectName'].patchValue(null);

    this.enableProjectField = false;
    const districtId =
      this.projectServcelineMappingForm.get('district')?.value.districtID;
    this.projectServicelineMappingService.getBlocks(districtId).subscribe(
      (res: any) => {
        if (res.data && res.statusCode === 200) {
          this.blocks = res.data;
        } else {
          this.confirmationService.alert(res.errorMessage, 'error');
        }
      },
      (err: any) => {
        this.confirmationService.alert(err.errorMessage, 'error');
      },
    );
  }

  getMappedProjectNames() {
    this.projectServcelineMappingForm.controls['projectId'].patchValue(null);
    this.projectServcelineMappingForm.controls['projectName'].patchValue(null);
    this.enableProjectField = false;
    const reqObj = {
      serviceLineId:
        this.projectServcelineMappingForm.get('serviceline')?.value.serviceID,
      serviceLine:
        this.projectServcelineMappingForm.get('serviceline')?.value.serviceName,
      stateId: this.projectServcelineMappingForm.get('state')?.value.stateID,
      stateName:
        this.projectServcelineMappingForm.get('state')?.value.stateName,
      districtId:
        this.projectServcelineMappingForm.get('district')?.value.districtID,
      districtName:
        this.projectServcelineMappingForm.get('district')?.value.districtName,
      serviceProviderId: this.dataService.service_providerID,
      blockId: this.projectServcelineMappingForm.get('block')?.value.blockID,
      blockName:
        this.projectServcelineMappingForm.get('block')?.value.blockName,
    };
    this.projectServicelineMappingService.fetchMappedProjects(reqObj).subscribe(
      (res: any) => {
        if (res && res.data && res.statusCode === 200) {
          if (
            res.data &&
            res.data.response !== null &&
            res.data.response !== 'null'
          ) {
            this.projectServcelineMappingForm.get('projectName')?.enable();
            this.getProjects();
            this.projectServcelineMappingForm.patchValue(res.data);
            this.projectServcelineMappingForm.controls[
              'projectName'
            ].patchValue(res.data.projectName);
            this.projectServcelineMappingForm.controls['projectId'].patchValue(
              res.data.projectId,
            );
            this.projectServcelineMappingForm.controls['id'].patchValue(
              res.data.id,
            );
            this.projectServcelineMappingForm.markAsPristine();
            this.enableUpdate = true;
          } else {
            this.projectServcelineMappingForm.get('projectName')?.enable();
            this.enableUpdate = false;
            this.getProjects();
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

  getProjects() {
    this.projectMasterService
      .getProjectMasters(this.dataService.service_providerID)
      .subscribe(
        (res: any) => {
          if (res && res.statusCode === 200) {
            this.projectNames = res.data;
          } else {
            this.confirmationService.alert(res.errorMessage, 'error');
          }
        },
        (err: any) => {
          this.confirmationService.alert(err.errorMessage, 'error');
        },
      );
  }

  setProjectId(project: any) {
    this.projectNames.forEach((item: any) => {
      if (project.projectName === item.projectName) {
        this.projectServcelineMappingForm.controls['projectId'].patchValue(
          item.projectId,
        );
      }
    });
  }

  updateProjectToServiceline() {
    const reqObj = {
      id: this.projectServcelineMappingForm.get('serviceline')?.value.id,
      serviceLineId:
        this.projectServcelineMappingForm.get('serviceline')?.value.serviceID,
      serviceLine:
        this.projectServcelineMappingForm.get('serviceline')?.value.serviceName,
      stateId: this.projectServcelineMappingForm.get('state')?.value.stateID,
      stateName:
        this.projectServcelineMappingForm.get('state')?.value.stateName,
      districtId:
        this.projectServcelineMappingForm.get('district')?.value.districtID,
      districtName:
        this.projectServcelineMappingForm.get('district')?.value.districtName,
      serviceProviderId: this.dataService.service_providerID,
      blockId: this.projectServcelineMappingForm.get('block')?.value.blockID,
      blockName:
        this.projectServcelineMappingForm.get('block')?.value.blockName,
      projectName: this.projectServcelineMappingForm.get('projectName')?.value,
      projectId: this.projectServcelineMappingForm.get('projectId')?.value,
      modifiedBy: this.dataService.uname,
    };
    this.projectServicelineMappingService
      .updateProjectToServiceline(reqObj)
      .subscribe(
        (res: any) => {
          if (res && res.statusCode === 200) {
            this.confirmationService.alert(
              'Project updated to servicveline successfully',
              'success',
            );
            this.projectServcelineMappingForm.reset();
            this.enableUpdate = false;
          } else {
            this.confirmationService.alert(res.errorMessage, 'error');
          }
        },
        (err: any) => {
          this.confirmationService.alert(err.errorMessage, 'error');
        },
      );
  }

  saveProjectToServiceline() {
    const reqObj = {
      serviceLineId:
        this.projectServcelineMappingForm.get('serviceline')?.value.serviceID,
      serviceLine:
        this.projectServcelineMappingForm.get('serviceline')?.value.serviceName,
      stateId: this.projectServcelineMappingForm.get('state')?.value.stateID,
      stateName:
        this.projectServcelineMappingForm.get('state')?.value.stateName,
      districtId:
        this.projectServcelineMappingForm.get('district')?.value.districtID,
      districtName:
        this.projectServcelineMappingForm.get('district')?.value.districtName,
      serviceProviderId: this.dataService.service_providerID,
      blockId: this.projectServcelineMappingForm.get('block')?.value.blockID,
      blockName:
        this.projectServcelineMappingForm.get('block')?.value.blockName,
      projectName: this.projectServcelineMappingForm.get('projectName')?.value,
      projectId: this.projectServcelineMappingForm.get('projectId')?.value,
      createdBy: this.dataService.uname,
    };
    this.projectServicelineMappingService
      .saveProjectToServiceline(reqObj)
      .subscribe(
        (res: any) => {
          if (res && res.statusCode === 200) {
            this.confirmationService.alert(
              'Project mapped to servicveline successfully',
              'success',
            );
            this.projectServcelineMappingForm.reset();
          } else {
            this.confirmationService.alert(res.errorMessage, 'error');
          }
        },
        (err: any) => {
          this.confirmationService.alert(err.errorMessage, 'error');
        },
      );
  }

  resetAllFields() {
    this.projectServcelineMappingForm.controls['state'].patchValue(null);
    this.projectServcelineMappingForm.controls['district'].patchValue(null);
    this.projectServcelineMappingForm.controls['block'].patchValue(null);
    this.projectServcelineMappingForm.controls['projectName'].patchValue(null);
    this.projectServcelineMappingForm.controls['projectId'].patchValue(null);
    this.districts = [];
    this.blocks = [];
    this.projectNames = [];
  }
}
