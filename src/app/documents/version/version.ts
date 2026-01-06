import { Component } from '@angular/core';
import { DocumentService } from '../../services/document-service';

@Component({
  selector: 'app-version',
  standalone: false,
  templateUrl: './version.html',
  styleUrl: './version.css',
})
export class Version {
  customerId = 1;
  docType = 'AADHAR';
  documents: any[] = [];

  constructor(private docService: DocumentService) {}

  loadHistory() {
    this.docService.history(this.customerId, this.docType)
      .subscribe((res: any) => {
        this.documents = res;
      });
  }

  download(id: number) {
    this.docService.download(id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

}
