import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarusuarioComponent } from './criarusuario.component';

describe('CriarusuarioComponent', () => {
  let component: CriarusuarioComponent;
  let fixture: ComponentFixture<CriarusuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarusuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
