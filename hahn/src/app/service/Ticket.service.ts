import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tick } from '@angular/core/testing';
import { TimeScale } from 'chart.js';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl: string = `${environment.apiUrl}/Tickets/`;

  constructor(private http:HttpClient) { }
  getTicketsPaginate(skip: number, limit: number, statut?: number | string, sortColumn?: string, sortDirection?: string) {
    let url = `${this.baseUrl}GetTicketsWithPagination/${skip}/${limit}`;
    
    
    // Append the statut filter if provided
    if (statut !== undefined && statut !== "undefined") {
        url += `?statut=${statut}`;
      }else{
      url += `?statut=`;

    }

    // Append sorting parameters if provided
    if (sortColumn) {
        url += `&sortColumn=${sortColumn}`;
    }
    if (sortDirection) {
        url += `&sortDirection=${sortDirection}`;
    }

    return this.http.get<any[]>(url);
}
  ChangeStatut(ticket:any){
    console.log(this.baseUrl)
      return this.http.put<any>(`${this.baseUrl}ChangeStatut`,ticket);
  }
  
  updateTicket(ticket:any){
    return this.http.put<any>(`${this.baseUrl}UpdateTicket`,ticket);
  }
  addnewTicket(ticket:any){
    return this.http.post<any>(`${this.baseUrl}AddNewTicket`,ticket)
  }
  removeticket(ticketId:any){
    return this.http.delete<any>(`${this.baseUrl}DeleteTicket/${ticketId}`)
  }
  getAllListTickets(){
    return this.http.get<any>(`${this.baseUrl}getAllTickets`);
  }



  public toggleDesactivate(id: number, toggle: boolean): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}toggledesactivate/${toggle}/${id}`, { id, toggle });
  }
  updateLanguageName(language:any){
    return this.http.put<any>(`${this.baseUrl}`,language)
  }
  searchLanguePaginate(term:string,skip:number,take:number){
    return this.http.get<any>(`${this.baseUrl}searchLanguePaginate/${skip}/${take}/${term}`);
  }
  AddNewLnaguage(language:any){
    return this.http.post<any>(`${this.baseUrl}`,language)
  }
  deleteLanguages(LanguageId: string[]): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}delete-list`, { body: LanguageId });
}
}
