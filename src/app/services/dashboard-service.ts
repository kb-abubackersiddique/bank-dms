import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
   private api = 'http://localhost:5200/api/dashboard';

  constructor(private http: HttpClient) {}

  getCounts() {
    return this.http.get<any>(`${this.api}/counts`);
  }

  getDocumentStats() {
    return this.http.get<any>(`${this.api}/document-stats`);
  }
  
}
