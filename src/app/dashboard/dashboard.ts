import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard-service';
import Chart from 'chart.js/auto';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements AfterViewInit {
  counts: any = {};
  role!: string;

  statusChart: any;
  typeChart: any;

  constructor(
    private dashboardService: DashboardService,
    public auth: AuthService
  ) {}

  ngAfterViewInit() {
  this.role = this.auth.getRole();
  this.loadCounts();

  setTimeout(() => {
    this.loadCharts();
  }, 0);
}

  loadCounts() {
    this.dashboardService.getCounts().subscribe(res => {
      this.counts = res;
    });
  }

  loadCharts() {
    this.dashboardService.getDocumentStats().subscribe(res => {
      this.createStatusChart(res.status);
      this.createTypeChart(res.types);
    });
  }

  createStatusChart(data: any) {
  const approved = Number(data.approved) || 0;
  const pending = Number(data.pending) || 0;

  // 🚨 Chart.js pie fails with empty or single zero
  const chartData =
    approved === 0 && pending === 0
      ? [1]                       // dummy invisible slice
      : pending === 0
      ? [approved, 0.0001]
      : approved === 0
      ? [0.0001, pending]
      : [approved, pending];

  if (this.statusChart) {
    this.statusChart.destroy();
  }

  this.statusChart = new Chart(
    document.getElementById('statusChart') as HTMLCanvasElement,
    {
      type: 'pie',
      data: {
        labels:
          approved === 0 && pending === 0
            ? ['No Data']
            : ['Approved', 'Pending'],
        datasets: [
          {
            data: chartData,
          }
        ]
      },
      options: {
        responsive: true,
      }
    }
  );
}


  createTypeChart(data: any) {
  if (this.typeChart) {
    this.typeChart.destroy();
  }

  this.typeChart = new Chart(
  document.getElementById('typeChart') as HTMLCanvasElement,
  {
    type: 'bar',
    data: {
      labels: Object.keys(data),
      datasets: [
        {
          data: Object.values(data).map(v => Number(v)),
        }
      ]
    },
    options: { responsive: true }
  }
);

}

}
