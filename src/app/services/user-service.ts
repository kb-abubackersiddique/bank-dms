import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = 'http://localhost:5200/api/users';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(this.api);
  }

  create(user: any) {
    return this.http.post(this.api, user);
  }
  
  delete(id: number) {
  return this.http.delete(`${this.api}/${id}`);
}

}
