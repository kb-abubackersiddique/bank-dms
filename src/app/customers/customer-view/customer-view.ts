import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer-service';
import { DocumentService } from '../../services/document-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-customer-view',
  standalone: false,
  templateUrl: './customer-view.html',
  styleUrl: './customer-view.css',
})
export class CustomerView {
 customer: any;
  documents: any[] = [];
  customerId!: number;
  role = '';

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
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private docService: DocumentService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.customerId = Number(this.route.snapshot.paramMap.get('id'));
    this.role = this.auth.getRole();

    this.loadCustomer();
    this.loadDocuments();
  }

  loadCustomer() {
    this.customerService.getById(this.customerId)
      .subscribe(res => this.customer = res);
  }

  loadDocuments() {
    this.docService.getByCustomer(this.customerId)
      .subscribe((res: any[]) => this.documents = res);
  }

  approve(id: number) {
    this.docService.approve(id, true).subscribe(() => {
      alert('Approved');
      this.loadDocuments();
    });
  }

  reject(id: number) {
    this.docService.approve(id, false).subscribe(() => {
      alert('Rejected');
      this.loadDocuments();
    });
  }

  getBranchName(code: string) {
    const branch = this.branches.find(b => b.code === code);
    return branch ? branch.name : code;
  }
}
