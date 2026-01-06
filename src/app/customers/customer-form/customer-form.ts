import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer-service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  standalone: false,
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css',
})
export class CustomerForm implements OnInit{

   customer: any = {};
  id!: number;
  isEdit = false;

  // Branch list
  branches = [
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
    private service: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEdit = true;
      this.service.getById(this.id).subscribe(res => {
        this.customer = res;
      });
    }
  }

  save() {
    // REQUIRED FIELD CHECK
    if (!this.customer.fullName || !this.customer.accountNumber || !this.customer.branchCode) {
      alert("Full Name, Account Number, and Branch Code are required.");
      return;
    }

    if (this.isEdit) {
      this.service.update(this.id, this.customer).subscribe(() => {
        alert('Customer updated');
        this.router.navigate(['/customers']);
      });
    } else {
      this.service.add(this.customer).subscribe(() => {
        alert('Customer added');
        this.router.navigate(['/customers']);
      });
    }
  }
}