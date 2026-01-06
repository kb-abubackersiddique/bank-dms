import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  standalone: false,
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css',
})
export class CustomerList implements OnInit{
  customers: any[] = [];

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getAll().subscribe(res => {
      this.customers = res;
    });
  }

  add() {
    this.router.navigate(['/customers/add']);
  }

  edit(cust: any) {
  this.router.navigate(['/customers/edit', cust.CustomerId]);
}

delete(cust: any) {
  this.customerService.delete(cust.CustomerId).subscribe(() => {
    alert('Deleted');
    this.loadCustomers();
  });
}
view(id: number) {
  this.router.navigate(['/customers/view', id]);
}
}