import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProviderAdminRoleService } from './services/state-serviceline-role.service';
import { MaterialModule } from 'src/app/core/material.module';
import {
  CallDispositionTypeMasterComponent,
  EditCallType,
} from './call-disposition-type-master/call-disposition-type-master.component';
import { CategorySubcategoryProvisioningComponent } from './category-subcategory-provisioning/category-subcategory-provisioning.component';
import { EditCategorySubcategoryComponent } from './category-subcategory-provisioning/edit-category-subcategory/edit-category-subcategory.component';
import { EmployeeMasterNewComponent } from './employee-master-new/employee-master-new.component';
import {
  FeedbackTypeMasterComponent,
  EditFeedbackModal,
} from './feedback-type-master/feedback-type-master.component';
import { EditInstituteDirectoryComponent } from './institute-directory-master/edit-institute-directory/edit-institute-directory.component';
import { InstituteDirectoryMasterComponent } from './institute-directory-master/institute-directory-master/institute-directory-master.component';
import { LanguageMappingComponent } from './language-mapping/language-mapping.component';
import {
  LocationServicelineMappingComponent,
  EditLocationModalComponent,
} from './location-serviceline-mapping/location-serviceline-mapping.component';
import { RoleMasterComponent } from './role-master/provider-admin-role-master.component';
import { ServicelineCdssMapping } from './serviceline-cdss-mapping/servicelineCdssMapping.component';
import { SpecialistMappingComponent } from './specialist-mapping/specialist-mapping.component';
import { WorkLocationMappingComponent } from './work-location-mapping/work-location-mapping.component';
import { VillageMasterService } from 'src/app/core/services/adminServices/AdminVillage/village-master-service.service';
import { CommonServices } from 'src/app/core/services/inventory-services/commonServices';
import { CallTypeSubtypeService } from './services/calltype-subtype-master-service.service';
import { CategorySubcategoryService } from './services/category-subcategory-master-service.service';
import { EmployeeMasterNewServices } from './services/employee-master-new-services.service';
import { FeedbackTypeService } from './services/feedback-type-master-service.service';
import { InstituteDirectoryMasterService } from './services/institute-directory-master-service.service';
import { LanguageMapping } from './services/language-mapping.service';
import { LocationServicelineMapping } from './services/location-serviceline-mapping.service';
import { SpecialistMappingService } from './services/specialist-mapping.service';
import { WorkLocationMapping } from './services/work-location-mapping.service';

@NgModule({
  declarations: [
    LocationServicelineMappingComponent,
    EditLocationModalComponent,
    EmployeeMasterNewComponent,
    LanguageMappingComponent,
    RoleMasterComponent,
    SpecialistMappingComponent,
    CallDispositionTypeMasterComponent,
    EditCallType,
    ServicelineCdssMapping,
    CategorySubcategoryProvisioningComponent,
    EditCategorySubcategoryComponent,
    FeedbackTypeMasterComponent,
    EditFeedbackModal,
    InstituteDirectoryMasterComponent,
    EditInstituteDirectoryComponent,
    WorkLocationMappingComponent,
    InstituteDirectoryMasterComponent,
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatTableModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
  ],
  providers: [
    ProviderAdminRoleService,
    LocationServicelineMapping,
    CommonServices,
    EmployeeMasterNewServices,
    LanguageMapping,
    WorkLocationMapping,
    VillageMasterService,
    SpecialistMappingService,
    CallTypeSubtypeService,
    InstituteDirectoryMasterService,
    CategorySubcategoryService,
    FeedbackTypeService,
  ],
  exports: [
    LocationServicelineMappingComponent,
    EditLocationModalComponent,
    EmployeeMasterNewComponent,
    LanguageMappingComponent,
    RoleMasterComponent,
    SpecialistMappingComponent,
    CallDispositionTypeMasterComponent,
    EditCallType,
    ServicelineCdssMapping,
    CategorySubcategoryProvisioningComponent,
    EditCategorySubcategoryComponent,
    FeedbackTypeMasterComponent,
    EditFeedbackModal,
    InstituteDirectoryMasterComponent,
    EditInstituteDirectoryComponent,
    WorkLocationMappingComponent,
    InstituteDirectoryMasterComponent,
  ],
})
export class ActivitiesModule {}
