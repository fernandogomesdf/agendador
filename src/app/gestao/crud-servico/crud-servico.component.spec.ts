import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudServicoComponent } from './crud-servico.component';

describe('CrudServicoComponent', () => {
  let component: CrudServicoComponent;
  let fixture: ComponentFixture<CrudServicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudServicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
