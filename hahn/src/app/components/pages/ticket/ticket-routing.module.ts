import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ticketComponent } from './ticket.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {path:'',component:ticketComponent}
  ])],
  exports: [RouterModule]
})
export class LangueRoutingModule { }
