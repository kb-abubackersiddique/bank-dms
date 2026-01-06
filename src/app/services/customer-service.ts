import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
   private api = 'http://localhost:5200/api/customers';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(`${this.api}`);
  }

  getById(id: number) {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  add(customer: any) {
    return this.http.post(`${this.api}`, customer);
  }

  update(id: number, customer: any) {
    return this.http.put(`${this.api}/${id}`, customer);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
  
}
