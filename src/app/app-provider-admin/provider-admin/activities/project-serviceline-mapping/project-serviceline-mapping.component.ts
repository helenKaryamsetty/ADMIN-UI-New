import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  state: any;
  district: any;
  block: any;
  serviceline: any;
  project: any;
  servicelines: any = [];
  states: any = [];
  districts: any = [];
  blocks: any = [];
  projectNames: any = [];

  @ViewChild('projectServcelineMappingForm')
  projectServcelineMappingForm!: NgForm;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['sno', 'projectName', 'deleted'];
  enableProjectField = false;
  serviceProviderId: any;

  constructor(
    private projectServicelineMappingService: ProjectServicelineMappingService,
    private confirmationService: ConfirmationDialogsService,
    private projectMasterService: ProjectMasterService,
    private dataService: dataService,
  ) {}

  ngOnInit() {
    this.serviceProviderId = this.dataService.service_providerID;
    this.getProviderServices();
  }

  getProviderServices() {
    const reqObj = {
      userID: 5,
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
    this.district = null;
    this.block = null;
    this.project = null;
    this.dataSource.data = [];
    this.enableProjectField = false;
    const stateId = this.state.stateID;
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
    this.block = null;
    this.project = null;
    this.dataSource.data = [];
    this.enableProjectField = false;
    const districtId = this.district.districtID;
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
    this.project = null;
    this.dataSource.data = [];
    this.enableProjectField = false;
    const reqObj = {
      serviceLineId: this.serviceline.serviceID,
      serviceLine: this.serviceline.serviceName,
      stateId: this.state.stateID,
      stateName: this.state.stateName,
      districtId: this.district.districtID,
      districtName: this.district.districtName,
      serviceProviderId: this.dataService.service_providerID,
      blockId: this.block.blockID,
      blockName: this.block.blockName,
    };
    this.projectServicelineMappingService.fetchMappedProjects(reqObj).subscribe(
      (res: any) => {
        if (res && res.data && res.statusCode === 200) {
          if (
            res.data &&
            res.data.response !== null &&
            res.data.response !== 'null'
          ) {
            this.project = null;
            this.enableProjectField = false;
            const dataSource = res.data;
            this.dataSource.data = Object.entries(dataSource).map(
              ([key, value]) => ({ key, value }),
            );
            this.dataSource.paginator = this.paginator;
          } else {
            this.enableProjectField = true;
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
      .getProjectMasters(this.serviceProviderId)
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

  saveProjectToServiceline() {
    const reqObj = {
      serviceLineId: this.serviceline.serviceID,
      serviceLine: this.serviceline.serviceName,
      stateId: this.state.stateID,
      stateName: this.state.stateName,
      districtId: this.district.districtID,
      districtName: this.district.districtName,
      serviceProviderId: this.dataService.service_providerID,
      blockId: this.block.blockID,
      blockName: this.block.blockName,
      projectName: this.project.projectName,
      projectId: this.project.projectId,
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
    this.state = null;
    this.district = null;
    this.block = null;
    this.project = null;
    this.dataSource.data = [];
  }
}
