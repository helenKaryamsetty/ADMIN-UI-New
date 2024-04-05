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
import { MaterialModule } from '../core/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProviderAdminRoleService } from './services/state-serviceline-role.service';
import { ItemService } from './services/item.service';
import { SnomedMasterService } from '../configurations/services/snomed-master.service';
import { SmsTemplateService } from './services/sms-template-service.service';
// import { EditLocationModalComponent } from '../location-serviceline-mapping/location-serviceline-mapping.component';
// import { EditLocationModalComponent } from '../location-serviceline-mapping/location-serviceline-mapping.component';

@NgModule({
  declarations: [
    // EditLocationModalComponent
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
  ],
  providers: [
    ProviderAdminRoleService,
    ItemService,
    SnomedMasterService,
    SmsTemplateService,
  ],
})
export class ActivitiesModule {}
