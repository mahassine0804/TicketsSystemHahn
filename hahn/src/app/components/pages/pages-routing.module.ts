import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ngxPermissionsGuard } from 'ngx-permissions';

@NgModule({
    imports: [RouterModule.forChild([

        

      

      

        { path: 'ticket', loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule)
        },

       
         

    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
