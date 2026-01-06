import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditLog } from './audit-log';

describe('AuditLog', () => {
  let component: AuditLog;
  let fixture: ComponentFixture<AuditLog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuditLog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditLog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
