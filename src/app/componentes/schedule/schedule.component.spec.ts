import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Schedule } from './schedule.component';

describe('Schedule', () => {

  let schedule: Schedule;
  let fixture: ComponentFixture<Schedule>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Schedule
      ]
    });

    fixture = TestBed.createComponent(Schedule);
    schedule = fixture.componentInstance;
  });
});