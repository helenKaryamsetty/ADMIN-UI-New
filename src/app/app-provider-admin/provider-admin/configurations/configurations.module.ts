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
import { UserSignatureMappingComponent } from './user-signature-mapping/user-signature-mapping.component';
import { EmployeeParkingPlaceMappingService } from '../activities/services/employee-parking-place-mapping.service';
import { WrapupTimeConfigurationComponent } from './wrapup-time-configuration/wrapup-time-configuration.component';
import { WrapupTimeConfigurationService } from 'src/app/core/services/ProviderAdminServices/wrapup-time-configuration.service';

@NgModule({
  declarations: [
    AgentListCreationComponent,
    AddQuestionnaireComponent,
    EditQuestionnaireComponent,
    SnomedCodeSearchComponent,
    MapSnommedCTCodeComponent,
    SmsTemplateComponent,
    UserSignatureMappingComponent,
    WrapupTimeConfigurationComponent,
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
    EmployeeParkingPlaceMappingService,
    WrapupTimeConfigurationService,
  ],
  exports: [
    AgentListCreationComponent,
    AddQuestionnaireComponent,
    EditQuestionnaireComponent,
    SnomedCodeSearchComponent,
    MapSnommedCTCodeComponent,
    SmsTemplateComponent,
    UserSignatureMappingComponent,
    WrapupTimeConfigurationComponent,
  ],
})
export class ConfigurationsModule {}
