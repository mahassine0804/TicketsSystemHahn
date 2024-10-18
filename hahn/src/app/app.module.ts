import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
    declarations: [AppComponent],
    imports: [AppRoutingModule,CommonModule,ProgressSpinnerModule ,ReactiveFormsModule,
        NgxPermissionsModule.forRoot(),
   
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
       
      
         
    ],
    exports: [
        
        NgxPermissionsModule,
          ],
    bootstrap: [AppComponent],
   
})
export class AppModule {}
