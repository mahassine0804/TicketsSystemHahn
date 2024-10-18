import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

import { Subject } from 'rxjs';

import { NgxPermissionsService } from 'ngx-permissions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    
    constructor(  private permissionsService:NgxPermissionsService, private cdr: ChangeDetectorRef,
        private primengConfig: PrimeNGConfig) { }
   
    ngOnInit() {
        this.primengConfig.ripple = true;


      //  var userlocal = sessionStorage.getItem('adminId') ?? ''; 
      //   this.RoleService.GetUserRoles(userlocal).subscribe((data: any) => { 
      //     var Userroles2 = data.accessright; 
      //     var a =  Userroles2.split(","); 
      //     this.permissionsService.loadPermissions(a); 
      // });
    }
}
