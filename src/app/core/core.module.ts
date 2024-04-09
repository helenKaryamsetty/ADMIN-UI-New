import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthGuard } from './services/authGuardService/auth-guard.services';
import { ConfigService } from './services/config/config.service';
import { DashboardHttpServices } from './services/dashboard-service/dashboard-service.service';
import { dataService } from './services/dataService/data.service';
import { ConfirmationDialogsService } from './services/dialog/confirmation.service';
import { HttpServices } from './services/http-services/http_services.service';
import { SpinnerService } from './services/spinnerService/spinner.service';
import { LanguageService } from './services/adminServices/AdminLanguage/language.service';
import { RoleService } from './services/adminServices/AdminRole/role.service';
import { ScreenService } from './services/adminServices/AdminScreen/screen.service';
import { ServicemasterService } from './services/adminServices/AdminService/servicemaster.service';
import { ViewVersionDetailsComponent } from './components/view-version-details/view-version-details.component';
import { MaterialModule } from './material.module';
import { AuthService } from './services/authentication/auth.service';
import { CommonDialogComponent } from './components/common-dialog/common-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonServices } from './services/inventory-services/commonServices';
import { VanMasterService } from './services/ProviderAdminServices/van-master-service.service';

@NgModule({
  declarations: [
    ViewVersionDetailsComponent,
    CommonDialogComponent,
    // ProviderAdminComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
  ],
  exports: [CommonDialogComponent],
  providers: [
    HttpClient,
    ConfigService,
    ConfirmationDialogsService,
    dataService,
    HttpServices,
    SpinnerService,
    AuthGuard,
    DashboardHttpServices,
    LanguageService,
    RoleService,
    ScreenService,
    ServicemasterService,
    CommonServices,
    VanMasterService
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        AuthGuard,
        AuthService,
        SpinnerService,
        ConfigService,
        ConfirmationDialogsService,
        dataService,
        HttpServices,
        DashboardHttpServices,
        LanguageService,
      ],
    };
  }
}
