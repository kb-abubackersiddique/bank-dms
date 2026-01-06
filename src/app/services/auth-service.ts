import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 private api = 'http://localhost:5200/api/auth';

  constructor(private http: HttpClient) {}

 login(data: any) {
  return this.http.post<any>(`${this.api}/login`, data).pipe(
    tap(res => {
      this.saveSession(res.token, res.role, res.branchCode);
    })
  );
}


saveSession(token: string, role: string, branchCode: string) {
  localStorage.setItem('token', token);
  localStorage.setItem('role', role?.toUpperCase() || '');
  localStorage.setItem('branchCode', branchCode || '');
}

getBranch(): string {
  return localStorage.getItem('branchCode') || '';
}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  hasRole(roles: string[]): boolean {
  const role = this.getRole().toUpperCase(); // make sure role is uppercase
  return roles.some(r => r.toUpperCase() === role);
}
isTokenExpired(): boolean {
  const token = this.getToken();
  if (!token) return true;

  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.exp * 1000 < Date.now();
}


 isLoggedIn(): boolean {
  return !!this.getToken() && !this.isTokenExpired();
}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
  }
}
