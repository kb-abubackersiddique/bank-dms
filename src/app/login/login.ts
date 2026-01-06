import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
   model: any = {};

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    if (!this.model.username || !this.model.password) {
      alert('Please enter username and password');
      return;
    }
  this.auth.login(this.model).subscribe(res => {
  console.log('Login response', res); // 🔍 check keys
  this.auth.saveSession(res.token, res.Role, res.branchCode); // match C# property
  alert('Login Successful');
  this.router.navigate(['/dashboard']);
});

}



}
