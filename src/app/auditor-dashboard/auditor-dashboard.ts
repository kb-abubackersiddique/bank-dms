import { Component, OnInit } from '@angular/core';
import { AuditorDashboardService } from '../services/auditor-dashboard-service';

@Component({
  selector: 'app-auditor-dashboard',
  standalone: false,
  templateUrl: './auditor-dashboard.html',
  styleUrl: './auditor-dashboard.css',
})
export class AuditorDashboard implements OnInit{
     summary: any = {};

  constructor(private service: AuditorDashboardService) {}

  ngOnInit() {
    this.service.getSummary().subscribe(res => {
      this.summary = res;
    });
  }
}
