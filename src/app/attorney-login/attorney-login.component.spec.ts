import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttorneyLoginComponent } from './attorney-login.component';

describe('AttorneyLoginComponent', () => {
  let component: AttorneyLoginComponent;
  let fixture: ComponentFixture<AttorneyLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttorneyLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttorneyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
