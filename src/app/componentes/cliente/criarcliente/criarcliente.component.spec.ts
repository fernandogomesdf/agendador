import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarclienteComponent } from './criarcliente.component';

describe('CriarclienteComponent', () => {
  let component: CriarclienteComponent;
  let fixture: ComponentFixture<CriarclienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarclienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
