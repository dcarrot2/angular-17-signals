import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuryStatusComponent } from './jury-status.component';

describe('JuryStatusComponent', () => {
  let component: JuryStatusComponent;
  let fixture: ComponentFixture<JuryStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuryStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
