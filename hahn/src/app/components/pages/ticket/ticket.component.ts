import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TicketService } from 'src/app/service/Ticket.service';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from '@angular/router';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
  providers: [MessageService ,ConfirmationService],
})
export class ticketComponent implements OnInit{
  listTickets:any
  listTicketsSearch:any[]=[];
  spinner:boolean=false
listAllTickets:any
listAllTicketsCount:any


  TicketUpdateDialog:boolean = false;
  addnewTicketDialog:boolean=false;
  statutFilter: number | undefined; // Declare statutFilter as number or undefined


  sortedTickets: any[] = [];  // This will display sorted data from the API
  sortColumn: string = '';  // The current column being sorted
  sortDirection: 'asc' | 'desc' = 'asc';

  UpdateTicketForm!:FormGroup;
  AddNewTicketForm!:FormGroup;

  //pagination
  total:number = 0;
  limit:number =4;
  loading : boolean =true;
  page:number = 0;
  length:number=0;
  allTicketsDialog:boolean=false
  constructor(private TicketService:TicketService,
   private confirmationService: ConfirmationService, private messageService: MessageService,private formbuilder:FormBuilder,
   
   ){

  }
  ngOnInit() {
   this.spinner = true
    this.UpdateTicketForm = this.formbuilder.group({
      TicketId: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Statut: ['', [Validators.required]],

    });
    this.AddNewTicketForm = this.formbuilder.group({
     
      Description: ['', [Validators.required]],
      Statut: ['', [Validators.required]],

    });

      this.getAllTicketsPaginate();
  }
  sort(column: string) {
    if (this.sortColumn === column) {
      // Toggle sorting direction if the same column is clicked
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Set the new column and default sorting direction to 'asc'
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    // Call your sorting logic here, for example, update the table rows
  }
  cancel(){
    this.TicketUpdateDialog = false
  }
  showUpdateDialog(ticket: any) {
    this.TicketUpdateDialog = true;
    // this.selectedlanguageId = ticket
    this.UpdateTicketForm.patchValue({
        TicketId: ticket.ticketId,
        Description: ticket.description,
        Statut: ticket.statut
    });
}
SHowaddnewdialog(){
  this.addnewTicketDialog = true
}
showallDialog(){
  this.TicketService.getAllListTickets().subscribe({
    next:(value:any)=> {
      this.listAllTickets = value
      if(value[0]){

        this.listAllTicketsCount = value[0].count
      }
    },
  })
  this.allTicketsDialog = true
}
 

    edit() {
      if(this.UpdateTicketForm.valid){

        this.TicketService.updateTicket(this.UpdateTicketForm.value).subscribe({
          next: (value: any) => {
            // Show success message
            this.messageService.add({
              severity: 'success',
              summary: 'Update Successful',
              detail: 'Ticket has been updated successfully!',
              life: 3000 // The message will disappear after 3 seconds
            });
            this.TicketUpdateDialog =false
            this.getAllTicketsPaginate();
           
          },
          error: (err: any) => {
            // Show error message if something goes wrong
            this.messageService.add({
              severity: 'error',
              summary: 'Update Failed',
              detail: 'Failed to update the ticket.',
              life: 3000
            });
          }
        });
      }
    }
    addnewTicket(){
  this.AddNewTicketForm.get('Statut')?.markAsTouched();
  this.AddNewTicketForm.get('Description')?.markAsTouched();

      if(this.AddNewTicketForm.valid){
          this.TicketService.addnewTicket(this.AddNewTicketForm.value).subscribe({
            next:(value:any)=> {
              this.messageService.add({
                severity: 'success',
                summary: 'added Successful',
                detail: 'Ticket has been added successfully!',
                life: 3000 // The message will disappear after 3 seconds
              });
              this.addnewTicketDialog =false
              this.getAllTicketsPaginate();
            }, error: (err: any) => {
              // Show error message if something goes wrong
              this.messageService.add({
                severity: 'error',
                summary: 'add Failed',
                detail: 'Failed to add the ticket.',
                life: 3000
              });
            }
          })
      }
    }
    
    onPageChange(event: any) {
      this.page = event.page ;
      this.limit = event.rows;
      this.getAllTicketsPaginate();
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
   
    
    
     getAllTicketsPaginate() {
    var countskip = (this.page) * this.limit;

    // Set the default sortColumn and sortDirection if they are not defined
    const sortColumn = this.sortColumn || 'ticketId'; // Set default to 'ticketId'
    const sortDirection = this.sortDirection || 'asc'; // Default to 'asc'

    // Pass the statutFilter to the service method
    this.TicketService.getTicketsPaginate(countskip, this.limit, this.statutFilter, sortColumn, sortDirection)
      .subscribe({
        next: (res:any) => {
          this.listTickets = res.tickets; // Updated to match the new structure
          this.total = res.totalCount; // Update total count accordingly
          this.spinner=false

         
        },
        error: (error) => {
          console.error('Error fetching tickets:', error);
        }
      });
}

      
     
   
    onStatutFilterChange() {
      this.getAllTicketsWithFilter(); // Fetch filtered tickets when the filter changes
    }
    
    // Fetch tickets based on the selected statut filter
    getAllTicketsWithFilter() {
      var countskip = (this.page) * this.limit;
      
      this.TicketService.getTicketsPaginate(countskip, this.limit, this.statutFilter).subscribe({
        next: (res:any) => {
          this.listTickets = res.tickets;
          
            this.total = res.totalCount;
          
         
        }
      });
    }
    onSortColumn(column: string) {
      // If the same column is clicked again, toggle the direction
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        // Set new sort column and reset direction to ascending
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
    
      // Fetch sorted tickets after updating sortColumn and sortDirection
      this.getAllTicketsPaginate();
    }
   
   
   
   

     confirm2(event: Event,languageId:any) {
     

        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: `You sure you want to delete Ticket the Id: ${languageId}?`,
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: 'p-button-danger p-button-sm',
            acceptLabel: 'yes',  
            rejectLabel: 'No',  
            accept: () => {
              this.removeTicket(languageId);
            },
            reject: () => {
            }
        });
      
  }
    
  ChangeStatut(ticketid: any,statut:any) {
    // Handle the status change logic here, e.g., update the status in the database
    let ticket ={
      TicketId:ticketid,
      Statut:statut
    }
    this.TicketService.ChangeStatut(ticket).subscribe({
      next:(value:any)=>{
        console.log(value);
      }
    })
  }
    
showAllTicketsDialog() {
  this.allTicketsDialog = true;
}

closeAllTicketsDialog() {
  this.allTicketsDialog = false;
}
removeTicket(languageId:any){
  
    this.TicketService.removeticket(languageId).subscribe({
      next:(res:any)=>{
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Ticket Removed', life: 3000 });  
       
      this.getAllTicketsPaginate();
      }
        
    })
  
    
  
  
}
get f() { return this.UpdateTicketForm.controls; }
get f2() { return this.AddNewTicketForm.controls; }




dirty(){
  this.UpdateTicketForm.get('Description')?.markAsTouched()
  this.AddNewTicketForm.get('Description')?.markAsTouched()
}

 
}
