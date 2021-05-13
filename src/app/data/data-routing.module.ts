import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataAuthResolver } from './data-auth-resolver.service';
import { DataComponent } from './data.component';

const routes: Routes = [
  {
    path: '',
    component: DataComponent,
    resolve: {
      isAuthenticated: DataAuthResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataRoutingModule {}
