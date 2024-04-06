import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditItemCategoryComponent } from './item-category-master/edit-item-category/edit-item-category.component';
import { ItemCategoryMasterComponent } from './item-category-master/item-category-master.component';
import { ManufacturerMasterComponent } from './manufacturer-master/manufacturer-master.component';
import { PharmacologicalCategoryMasterComponent } from './pharmacological-category-master/pharmacological-category-master.component';
import { ItemService } from './services/item.service';
import { SupplierMasterComponent } from './supplier-master/supplier-master.component';
import { ExpiryDateAlertConfigurationComponent } from './expiry-date-alert-configuration/expiry-date-alert-configuration.component';
import { ItemIssueMethodConfigComponent } from './item-issue-method-config/item-issue-method-config.component';
import { SearchUomMasterComponent } from './uom-master/search-uom-master/search-uom-master.component';
import { CreateUomMasterComponent } from './uom-master/create-uom-master/create-uom-master.component';
import { UpdateUomMasterComponent } from './uom-master/update-uom-master/update-uom-master.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from 'src/app/core/material.module';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    SupplierMasterComponent,
    ManufacturerMasterComponent,
    PharmacologicalCategoryMasterComponent,
    ItemCategoryMasterComponent,
    EditItemCategoryComponent,
    ExpiryDateAlertConfigurationComponent,
    ItemIssueMethodConfigComponent,
    SearchUomMasterComponent,
    CreateUomMasterComponent,
    UpdateUomMasterComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
  ],
  providers: [ItemService],
  exports: [
    SupplierMasterComponent,
    ManufacturerMasterComponent,
    PharmacologicalCategoryMasterComponent,
    ItemCategoryMasterComponent,
    EditItemCategoryComponent,
    ExpiryDateAlertConfigurationComponent,
    ItemIssueMethodConfigComponent,
    SearchUomMasterComponent,
    CreateUomMasterComponent,
    UpdateUomMasterComponent,
  ],
})
export class InventoryModule {}
