import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CriareventoComponent } from './criarevento.component';

describe('CriareventoComponent', () => {
  let component: CriareventoComponent;
  let fixture: ComponentFixture<CriareventoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CriareventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriareventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
