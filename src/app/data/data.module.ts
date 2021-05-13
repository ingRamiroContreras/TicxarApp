import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataRoutingModule } from './data-routing.module';
import { DataComponent } from './data.component';
import { DataAuthResolver } from './data-auth-resolver.service';


@NgModule({
  declarations: [
    DataComponent
  ],
  imports: [
    CommonModule,
    DataRoutingModule
  ],
  providers: [
    DataAuthResolver
  ]
})
export class DataModule { }
