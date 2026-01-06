import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuditService {
  private api = 'http://localhost:5200/api/audit';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(this.api);
  }

  clearLogs() {
  return this.http.delete(
    `${this.api}/clear`
  );
}

  
}
