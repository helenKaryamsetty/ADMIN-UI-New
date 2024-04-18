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
import { BlockServiceProviderComponent } from './block-service-provider/block-service-provider.component';
import { BlockProvider } from 'src/app/core/services/adminServices/AdminServiceProvider/block-provider-service.service';
import { UpdateServiceProviderComponent } from './update-service-provider/update-service-provider.component';
import { EditProviderDetailsComponent } from './edit-provider-details/edit-provider-details.component';
import {
  EditProviderAdminModalComponent,
  ProviderAdminListComponent,
} from './provider-admin-list/provider-admin-list.component';
import { MappingProviderAdminToProviderComponent } from './mapping-provider-admin-to-provider/mapping-provider-admin-to-provider.component';
import { CreateSubServiceComponent } from './create-sub-service/create-sub-service.component';
import {
  EditVillageModalComponent,
  VillageMasterComponent,
} from './village-master/village-master.component';

@NgModule({
  declarations: [
    ServiceProviderMasterComponent,
    ProviderServicelineStateMappingComponent,
    BlockServiceProviderComponent,
    UpdateServiceProviderComponent,
    EditProviderDetailsComponent,
    ProviderAdminListComponent,
    EditProviderAdminModalComponent,
    MappingProviderAdminToProviderComponent,
    CreateSubServiceComponent,
    VillageMasterComponent,
    EditVillageModalComponent,
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
  providers: [SuperAdmin_ServiceProvider_Service, BlockProvider],
  exports: [
    ServiceProviderMasterComponent,
    ProviderServicelineStateMappingComponent,
    BlockServiceProviderComponent,
    UpdateServiceProviderComponent,
    EditProviderDetailsComponent,
    ProviderAdminListComponent,
    EditProviderAdminModalComponent,
    MappingProviderAdminToProviderComponent,
    CreateSubServiceComponent,
    VillageMasterComponent,
    EditVillageModalComponent,
  ],
})
export class ActivitiesModule {}
