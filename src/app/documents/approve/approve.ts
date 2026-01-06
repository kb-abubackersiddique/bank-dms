import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document-service';

@Component({
  selector: 'app-approve',
  standalone: false,
  templateUrl: './approve.html',
  styleUrl: './approve.css',
})
export class Approve implements OnInit{
   documents: any[] = [];

  constructor(private docService: DocumentService) {}

ngOnInit() {
  // Example: fetch history & filter pending
  this.docService.getPending().subscribe((res: any) => {
    this.documents = res; // all pending documents
  });
}


  approve(id: number) {
    this.docService.approve(id, true).subscribe(() => {
      alert('Approved');
      this.ngOnInit();
    });
  }

  reject(id: number) {
    this.docService.approve(id, false).subscribe(() => {
      alert('Rejected');
      this.ngOnInit();
    });
  }

}
