import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CalendarioAlternativoComponent } from './calendario-alternativo.component';

describe('CalendarioAlternativoComponent', () => {
  let component: CalendarioAlternativoComponent;
  let fixture: ComponentFixture<CalendarioAlternativoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarioAlternativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioAlternativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
