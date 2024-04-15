import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddQuestionnaireComponent } from './questionnaire/add-questionnaire/add-questionnaire.component';
import { EditQuestionnaireComponent } from './questionnaire/edit-questionnaire/edit-questionnaire.component';
import { MapSnommedCTCodeComponent } from './map-snommed-ctcode/map-snommed-ctcode.component';
import { AgentListCreationService } from './services/agent-list-creation-service.service';
import { QuestionnaireServiceService } from './services/questionnaire-service.service';
import { SmsTemplateService } from './services/sms-template-service.service';
import { SnomedMasterService } from './services/snomed-master.service';
import { SmsTemplateComponent } from './sms-template/sms-template.component';
import { SnomedCodeSearchComponent } from './snomed-code-search/snomed-code-search.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/core/material.module';
import { MatIconModule } from '@angular/material/icon';
import { AgentListCreationComponent } from './agent-list-creation/agent-list-creation.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ServicePointVillageMapComponent } from './service-point-village-mapping/service-point-village-mapping.component';
import { ServicePointVillageMapService } from 'src/app/core/services/ProviderAdminServices/service-point-village-map.service';
import { VanServicePointMappingComponent } from './van-service-point-mapping/van-service-point-mapping.component';
import { VanServicePointMappingService } from 'src/app/core/services/ProviderAdminServices/van-service-point-mapping.service';
import { EmployeeParkingPlaceMappingComponent } from './employee-parking-place-mapping/employee-parking-place-mapping.component';
import { MappedVansComponent } from './mapped-vans/mapped-vans.component';
import { EmployeeParkingPlaceMappingService } from '../activities/services/employee-parking-place-mapping.service';
import { ProcedureComponentMappingComponent } from './procedure-component-mapping/procedure-component-mapping.component';
import { ProcedureComponentMappingServiceService } from '../inventory/services/procedure-component-mapping-service.service';
import { VanSpokeMappingComponent } from './van-spoke-mapping/van-spoke-mapping.component';
import { VanSpokeMappingService } from 'src/app/core/services/ProviderAdminServices/van-spoke-mapping.service';
import { VanDeviceIdMappingComponent } from './van-device-id-mapping/van-device-id-mapping.component';
import { FetosenseDeviceIdMasterService } from '../activities/services/fetosense-device-id-master-service.service';

@NgModule({
  declarations: [
    AgentListCreationComponent,
    AddQuestionnaireComponent,
    EditQuestionnaireComponent,
    SnomedCodeSearchComponent,
    MapSnommedCTCodeComponent,
    SmsTemplateComponent,
    ServicePointVillageMapComponent,
    VanServicePointMappingComponent,
    EmployeeParkingPlaceMappingComponent,
    MappedVansComponent,
    ProcedureComponentMappingComponent,
    VanSpokeMappingComponent,
    VanDeviceIdMappingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatNativeDateModule,
  ],
  providers: [
    SnomedMasterService,
    QuestionnaireServiceService,
    AgentListCreationService,
    SmsTemplateService,
    ServicePointVillageMapService,
    VanServicePointMappingService,
    EmployeeParkingPlaceMappingService,
    ProcedureComponentMappingServiceService,
    VanSpokeMappingService,
    FetosenseDeviceIdMasterService
  ],
  exports: [
    AgentListCreationComponent,
    AddQuestionnaireComponent,
    EditQuestionnaireComponent,
    SnomedCodeSearchComponent,
    MapSnommedCTCodeComponent,
    SmsTemplateComponent,
    ServicePointVillageMapComponent,
    VanServicePointMappingComponent,
    EmployeeParkingPlaceMappingComponent,
    MappedVansComponent,
    ProcedureComponentMappingComponent,
    VanSpokeMappingComponent,
    VanDeviceIdMappingComponent
  ],
})
export class ConfigurationsModule {}
