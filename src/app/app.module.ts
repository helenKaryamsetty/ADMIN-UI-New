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
import { MaterialModule } from './material.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { AddQuestionnaireComponent } from './add-questionnaire/add-questionnaire.component';
// import { EditQuestionnaireComponent } from './edit-questionnaire/edit-questionnaire.component';
import { CommonDialogComponent } from './common-dialog/common-dialog.component';
import { loginService } from './services/loginService/login.service';
import { loginContentClassComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ConfigService } from './services/config/config.service';
import { ConfirmationDialogsService } from './services/dialog/confirmation.service';
import { dataService } from './services/dataService/data.service';
import { HttpServices } from './http-services/http_services.service';
import { InterceptedHttp } from './http.interceptor';
import { SpinnerService } from './services/spinner.service';
import { ResetComponent } from './resetPassword/resetPassword.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { SetSecurityQuestionsComponent } from './set-security-questions/set-security-questions.component';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
// import { MultiRoleScreenComponent } from './multi-role-screen/multi-role-screen.component';
// import { AuthGuard } from './services/authGuardService/auth-guard.services';
// import { SuperAdminComponent } from './super-admin/super-admin.component';
// import { ProviderAdminComponent } from './provider-admin/provider-admin.component';
// import { LocationServicelineMappingComponent } from './location-serviceline-mapping/location-serviceline-mapping.component';
// import { ResetComponent } from './resetPassword/resetPassword.component';
// import { SetPasswordComponent } from './set-password/set-password.component';
// import { ProviderAdminComponent } from './provider-admin/provider-admin.component';
// import { SuperAdminComponent } from './super-admin/super-admin.component';
// import { AuthGuard } from './services/authGuardService/auth-guard.services';
// import { MultiRoleScreenComponent } from './multi-role-screen/multi-role-screen.component';
// import { SetSecurityQuestionsComponent } from './set-security-questions/set-security-questions.component';

@NgModule({
  declarations: [
    AppComponent,
    // AddQuestionnaireComponent,
    // EditQuestionnaireComponent,
    CommonDialogComponent,
    loginContentClassComponent,
    ResetComponent,
    SetPasswordComponent,
    SetSecurityQuestionsComponent,
    // ServicePointComponent,
    // ServiceComponent,
    // ResetPasswordComponent,
    // SetPasswordComponent,
    // SetSecurityQuestionsComponent,
    // TmLogoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatGridListModule,
    MatDialogModule,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule,
    MatTooltipModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatDatepickerModule,
    MatListModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot([
      {
        path: 'resetPassword',
        component: ResetComponent,
      },
      {
        path: 'setQuestions',
        component: SetSecurityQuestionsComponent,
      },
      // {
      //   path: 'MultiRoleScreenComponent',
      //   component: MultiRoleScreenComponent,
      //   canActivate: [AuthGuard],
      //   children: [
      //     {
      //       path: 'superAdmin',
      //       component: SuperAdminComponent,
      //       outlet: 'postLogin_router'
      //     },
      //     {
      //       path: 'providerAdmin',
      //       component: ProviderAdminComponent,
      //       outlet: 'postLogin_router'
      //     }
      //   ]
      // },
      {
        path: 'setPassword',
        component: SetPasswordComponent,
      },
      {
        path: '',
        component: loginContentClassComponent,
      },
    ]),
  ],
  // UserLoginModule,
  //DataSYNCModule,
  // CoreModule.forRoot()
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [
    HttpClient,
    HttpInterceptorService,
    loginService,
    ConfigService,
    ConfirmationDialogsService,
    dataService,
    HttpServices,
    SpinnerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
