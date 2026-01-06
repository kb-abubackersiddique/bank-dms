import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuditorDashboardService {
  
  private api = 'http://localhost:5200/api/auditor-dashboard';

  constructor(private http: HttpClient) {}

  getSummary() {
    return this.http.get<any>(`${this.api}/summary`);
  }
}
