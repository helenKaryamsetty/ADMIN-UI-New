import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationServicelineMappingComponent, EditLocationModalComponent } from './location-serviceline-mapping/location-serviceline-mapping.component';



@NgModule({
  declarations: [
    LocationServicelineMappingComponent,
    EditLocationModalComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class ActivitiesModule { }
