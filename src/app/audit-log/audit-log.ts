import { Component, OnInit } from '@angular/core';
import { AuditService } from '../services/audit-service';

@Component({
  selector: 'app-audit-log',
  standalone: false,
  templateUrl: './audit-log.html',
  styleUrl: './audit-log.css',
})
export class AuditLog implements OnInit{
    logs: any[] = [];

  constructor(private auditService: AuditService) {}

  ngOnInit() {
    this.auditService.getAll().subscribe(res => {
      this.logs = res;
    });
  }
  clearLogs() {
  if (!confirm('Clear all audit logs?')) return;

  this.auditService.clearLogs().subscribe(() => {
    alert('Audit logs cleared');
    this.ngOnInit();
  });
}


}
