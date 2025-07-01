import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:8000/api/client/';

  constructor(private http: HttpClient) { }

  getClients(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // OK : GET /api/client/
  }

  createClient(clientData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}create/`, clientData); // POST /api/client/create/
  }

  updateClient(pk: number, clientData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${pk}/update/`, clientData); // PUT /api/client/1/update/
  }

  deleteClient(pk: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${pk}/delete/`); // DELETE /api/client/1/delete/
  }
}