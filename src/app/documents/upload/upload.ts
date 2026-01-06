import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document-service';
import { CustomerService } from '../../services/customer-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.html',
  styleUrl: './upload.css',
})
export class Upload implements OnInit{
  customers: any[] = [];
  model: any = {
    customerId: '',
    documentType: ''
  };
  file!: File;

  constructor(
    private docService: DocumentService,
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

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  upload() {
    if (!this.file || !this.model.customerId || !this.model.documentType) {
      alert('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('CustomerId', this.model.customerId);
    formData.append('DocumentType', this.model.documentType);
    formData.append('file', this.file);

    this.docService.upload(formData).subscribe(() => {
      alert('Document uploaded successfully');
      this.router.navigate(['dashboard']);
      this.model = {};
    });
  }

}
