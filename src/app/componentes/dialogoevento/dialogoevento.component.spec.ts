import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogoeventoComponent } from './dialogoevento.component';

describe('DialogoeventoComponent', () => {
  let component: DialogoeventoComponent;
  let fixture: ComponentFixture<DialogoeventoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoeventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoeventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
