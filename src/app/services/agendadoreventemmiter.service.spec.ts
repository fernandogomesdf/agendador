import { TestBed } from '@angular/core/testing';

import { AgendadoreventemmiterService } from './agendadoreventemmiter.service';

describe('AgendadoreventemmiterService', () => {
  let service: AgendadoreventemmiterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendadoreventemmiterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
