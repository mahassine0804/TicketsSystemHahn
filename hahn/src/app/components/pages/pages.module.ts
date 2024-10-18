import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { AppComponent } from 'src/app/app.component';

@NgModule({
  
    imports: [
        CommonModule,
        PagesRoutingModule,
        CheckboxModule,
        FileUploadModule,
        AppComponent
    ]
})
export class PagesModule { }
