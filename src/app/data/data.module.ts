import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataRoutingModule } from './data-routing.module';
import { DataComponent } from './data.component';
import { DataAuthResolver } from './data-auth-resolver.service';
import { SharedModule } from '../shared';
import { AuthRoutingModule } from '../auth/auth-routing.module';


@NgModule({
  declarations: [
    DataComponent
  ],
  imports: [
    CommonModule,
    DataRoutingModule,
    SharedModule,
    AuthRoutingModule
  ],
  providers: [
    DataAuthResolver
  ]
})
export class DataModule { }

