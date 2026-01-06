import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit{
  users: any[] = [];
  loading = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe({
      next: (res) => {
        this.users = res;
        this.loading = false;
      },
      error: () => {
        alert('Failed to load users');
        this.loading = false;
      },
    });
  }

  deleteUser(id: number) {
  if (!confirm('Are you sure?')) return;

  this.userService.delete(id).subscribe({
    next: () => {
      alert('User deleted');
      this.loadUsers();
    },
    error: err => alert(err.error)
  });
}

}
