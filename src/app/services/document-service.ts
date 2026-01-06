import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
   private api = 'http://localhost:5200/api/documents';

  constructor(private http: HttpClient,private authService: AuthService) {}

  upload(form: FormData) {
    return this.http.post(`${this.api}/upload`, form);
  }

  approve(id: number, approve: boolean) {
  return this.http.put(
    `${this.api}/approve?documentId=${id}&approve=${approve}`,
    {}
  );
}


  history(customerId: number, type: string) {
    return this.http.get(`${this.api}/history/${customerId}/${type}`);
  }

  download(id: number) {
    return this.http.get(`${this.api}/download/${id}`, { responseType: 'blob' });
  }
 getPending() {
  return this.http.get<any[]>(`${this.api}/pending`).pipe(
    map(res => {
      const role = this.authService.getRole();
      const branch = this.authService.getBranch();
      if (role === 'OFFICER') {
        // Only show documents belonging to officer's branch
        return res.filter(d => d.BranchCode === branch);
      }
      return res;
    })
  );
}

getByCustomer(customerId: number) {
  return this.http.get<any[]>(
    `http://localhost:5200/api/documents/by-customer/${customerId}`
  );
}

  
}
