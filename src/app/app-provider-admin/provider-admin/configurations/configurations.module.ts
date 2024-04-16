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
import { AgentIDMappingModal, UserRoleAgentIDMappingComponent } from './user-role-agent-id-mapping/user-role-agent-id-mapping.component';
import { UserRoleAgentID_MappingService } from './services/user-role-agentID-mapping-service.service';
import { HospitalInstituteDirectorySubdirectoryMappingComponent } from './hospital-institute-directory-subdirectory-mapping/hospital-institute-directory-subdirectory-mapping.component';
import { HospitalInstituteMappingService } from '../activities/services/hospital-institute-mapping-service.service';
import { ResetUserPasswordService } from 'src/app/core/services/ProviderAdminServices/reset-user-password.service';
import { UtcDatePipe } from './utc-date.pipe';
import { ResetUserPasswordComponent } from './reset-user-password/reset-user-password.component';
import { SwymedUserMappingComponent } from './swymed-user-mapping/swymed-user-mapping.component';
import { SwymedUserConfigurationService } from './services/swymed-user-service';

@NgModule({
  declarations: [
    AgentListCreationComponent,
    AddQuestionnaireComponent,
    EditQuestionnaireComponent,
    SnomedCodeSearchComponent,
    MapSnommedCTCodeComponent,
    SmsTemplateComponent,
    UserRoleAgentIDMappingComponent,
    AgentIDMappingModal,
    HospitalInstituteDirectorySubdirectoryMappingComponent,
    ResetUserPasswordComponent,
    SwymedUserMappingComponent,
    UtcDatePipe
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
    UserRoleAgentID_MappingService,
    HospitalInstituteMappingService,
    ResetUserPasswordService,
    SwymedUserConfigurationService
  ],
  exports: [
    AgentListCreationComponent,
    AddQuestionnaireComponent,
    EditQuestionnaireComponent,
    SnomedCodeSearchComponent,
    MapSnommedCTCodeComponent,
    SmsTemplateComponent,
    UserRoleAgentIDMappingComponent,
    AgentIDMappingModal,
    HospitalInstituteDirectorySubdirectoryMappingComponent,
    ResetUserPasswordComponent,
    SwymedUserMappingComponent,
    UtcDatePipe
  ],
})
export class ConfigurationsModule {}
