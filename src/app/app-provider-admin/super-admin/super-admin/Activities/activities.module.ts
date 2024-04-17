import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MaterialModule } from 'src/app/core/material.module';
import { ServiceProviderMasterComponent } from './service-provider-master/service-provider-master.component';
import { SuperAdmin_ServiceProvider_Service } from 'src/app/core/services/adminServices/AdminServiceProvider/superadmin_serviceprovider.service';
import { ProviderServicelineStateMappingComponent } from './provider-serviceline-state-mapping/provider-serviceline-state-mapping.component';
import {
  EditProviderAdminModalComponent,
  ProviderAdminListComponent,
} from './provider-admin-list/provider-admin-list.component';

@NgModule({
  declarations: [
    ServiceProviderMasterComponent,
    ProviderServicelineStateMappingComponent,
    ProviderAdminListComponent,
    EditProviderAdminModalComponent,
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
  providers: [SuperAdmin_ServiceProvider_Service],
  exports: [
    ServiceProviderMasterComponent,
    ProviderServicelineStateMappingComponent,
    ProviderAdminListComponent,
    EditProviderAdminModalComponent,
  ],
})
export class ActivitiesModule {}
