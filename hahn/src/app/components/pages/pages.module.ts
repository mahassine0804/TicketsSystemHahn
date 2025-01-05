import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    CheckboxModule,
    FileUploadModule,
    BrowserAnimationsModule,
    ProgressSpinnerModule
  ]
})
export class PagesModule { }
