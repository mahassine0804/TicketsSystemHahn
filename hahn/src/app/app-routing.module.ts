import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [
        RouterModule.forRoot([
           
            { path: '', loadChildren: () => import('./components/pages/ticket/ticket.module').then(m => m.LangueModule),
               data:{
                
                }},
            
          
      

             ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
