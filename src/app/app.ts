import { Component, signal } from '@angular/core';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bankDms');
  isAdmin = false;

constructor(public auth: AuthService) {
 
}
}
