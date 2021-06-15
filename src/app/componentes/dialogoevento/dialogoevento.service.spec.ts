import { TestBed } from '@angular/core/testing';

import { DialogoeventoService } from './dialogoevento.service';

describe('DialogoeventoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DialogoeventoService = TestBed.get(DialogoeventoService);
    expect(service).toBeTruthy();
  });
});
