import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttorneyDashboardComponent } from './attorney-dashboard.component';

describe('AttorneyDashboardComponent', () => {
  let component: AttorneyDashboardComponent;
  let fixture: ComponentFixture<AttorneyDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttorneyDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttorneyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
