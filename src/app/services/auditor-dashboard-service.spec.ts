import { TestBed } from '@angular/core/testing';

import { AuditorDashboardService } from './auditor-dashboard-service';

describe('AuditorDashboardService', () => {
  let service: AuditorDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditorDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
