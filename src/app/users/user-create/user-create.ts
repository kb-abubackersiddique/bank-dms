import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-user-create',
  standalone: false,
  templateUrl: './user-create.html',
  styleUrl: './user-create.css',
})
export class UserCreate {
 user = {
    username: '',
    role: 'OFFICER',
    branchCode: '',
  };

  roles = ['OFFICER', 'MANAGER'];

  // Branch list (code + name)
  branches =[
  { "code": "BR001", "name": "Main Branch" },
  { "code": "BR002", "name": "City Branch" },
  { "code": "BR003", "name": "Airport Branch" },
  { "code": "BR004", "name": "Town Branch" },
  { "code": "BR005", "name": "North Branch" },
  { "code": "BR006", "name": "South Branch" },
  { "code": "BR007", "name": "East Branch" },
  { "code": "BR008", "name": "West Branch" },
  { "code": "BR009", "name": "Central Branch" },
  { "code": "BR010", "name": "Downtown Branch" }
];

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  save() {
    if (!this.user.username || !this.user.branchCode) {
      alert('All fields are required');
      return;
    }

    this.userService.create(this.user).subscribe({
      next: () => {
        alert('User created (Default password: Bank@123)');
        this.router.navigate(['/users']);
      },
      error: () => alert('Failed to create user'),
    });
  }
}
