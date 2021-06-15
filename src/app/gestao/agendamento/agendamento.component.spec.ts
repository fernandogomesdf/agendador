import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AgendamentoComponent } from './agendamento.component';

describe('CalendarioAlternativoComponent', () => {
  let component: AgendamentoComponent;
  let fixture: ComponentFixture<AgendamentoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
