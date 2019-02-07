import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Evento } from './evento.component';

describe('Evento', () => {
  let component: Evento;
  let fixture: ComponentFixture<Evento>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Evento]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Evento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
