import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CriarclienteComponent } from './criarcliente.component';

describe('CriarclienteComponent', () => {
  let component: CriarclienteComponent;
  let fixture: ComponentFixture<CriarclienteComponent>;

  beforeEach(waitForAsync(() => {
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
