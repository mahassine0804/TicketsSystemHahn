import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ngxPermissionsGuard } from 'ngx-permissions';

@NgModule({
    imports: [RouterModule.forChild([

        

      

      

        { path: 'langue', loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule),
        canActivate:[ngxPermissionsGuard] ,data:{
        permissions:{
        only:["143"],
        redirectTo:"/",
        }
        }},

       
         

    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
