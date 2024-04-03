import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import custom route module....
// import { CoreModule } from './app-modules/core/core.module';

// Custom components import....
// import { LoginComponent } from './user-login/login/login.component';
// import { ServicePointComponent } from './service-point/service-point.component';

// // Custom services import....
// import { ServicePointService } from './service-point/service-point.service';
// import { ServicePointResolve } from './service-point/service-point-resolve.service';

// import { ServiceComponent } from './service/service.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
// import { SetPasswordComponent } from './set-password/set-password.component';
// import { SetSecurityQuestionsComponent } from './set-security-questions/set-security-questions.component';

// import { DataSYNCModule } from './app-modules/data-sync/dataSync.module';
// import { TmLogoutComponent } from './tm-logout/tm-logout.component';
// import { HttpServiceService } from './app-modules/core/services/http-service.service';
// import { RegistrarService } from './app-modules/registrar/shared/services/registrar.service';
// import { FamilyTaggingService } from './app-modules/registrar/shared/services/familytagging.service';
// import { CbacService } from './app-modules/nurse-doctor/shared/services/cbac.service';
// import { HrpService } from './app-modules/nurse-doctor/shared/services/hrp.service';
// import { AudioRecordingService } from './app-modules/nurse-doctor/shared/servicimport {
//   HttpClient,
//   HttpClientModule,
//   HTTP_INTERCEPTORS,
// } from '@angular/common/http';
import { MaterialModule } from './core/material.module';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { HttpInterceptorService } from './core/services/httpInterceptor/http-interceptor.service';
import { loginContentClassComponent } from './user-login/login/login.component';
import { ResetComponent } from './user-login/resetPassword/resetPassword.component';
import { SetPasswordComponent } from './user-login/set-password/set-password.component';
import { SetSecurityQuestionsComponent } from './user-login/set-security-questions/set-security-questions.component';
import { UserLoginModule } from './user-login/user-login.module';
import { CoreModule } from './core/core.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AddQuestionnaireComponent } from './activities/questionnaire/add-questionnaire/add-questionnaire.component';
import { EditQuestionnaireComponent } from './activities/questionnaire/edit-questionnaire/edit-questionnaire.component';
import { ProviderAdminComponent } from './provider-admin/provider-admin.component';
import { MultiRoleScreenComponent } from './multi-role-screen/multi-role-screen.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import {
  EditLocationModalComponent,
  LocationServicelineMappingComponent,
} from './location-serviceline-mapping/location-serviceline-mapping.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EmployeeMasterNewComponent } from './employee-master-new/employee-master-new.component';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { LanguageMappingComponent } from './language-mapping/language-mapping.component';
import { WorkLocationMappingComponent } from './work-location-mapping/work-location-mapping.component';
import { RoleMasterComponent } from './role-master/provider-admin-role-master.component';
import { ProviderAdminRoleService } from './activities/services/state-serviceline-role.service';
import { SpecialistMappingComponent } from './specialist-mapping/specialist-mapping.component';

@NgModule({
  declarations: [
    AppComponent,
    loginContentClassComponent,
    ResetComponent,
    SetPasswordComponent,
    SetSecurityQuestionsComponent,
    AddQuestionnaireComponent,
    EditQuestionnaireComponent,
    ProviderAdminComponent,
    MultiRoleScreenComponent,
    SuperAdminComponent,
    LocationServicelineMappingComponent,
    EditLocationModalComponent,
    EmployeeMasterNewComponent,
    LanguageMappingComponent,
    WorkLocationMappingComponent,
    RoleMasterComponent,
    SpecialistMappingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UserLoginModule,
    CoreModule.forRoot(),
    // ActivitiesModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatExpansionModule
  ],
  // UserLoginModule,
  //DataSYNCModule,
  // CoreModule.forRoot()
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    HttpClient,
    ProviderAdminRoleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  // entryComponents: [
  //   CommonDialogComponent,
  //   ViewVersionDetailsComponent,
  // ],
  bootstrap: [AppComponent],
})
export class AppModule {}
