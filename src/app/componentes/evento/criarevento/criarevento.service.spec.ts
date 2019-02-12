import { TestBed } from '@angular/core/testing';

import { CriareventoService } from './criarevento.service';

describe('CriareventoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CriareventoService = TestBed.get(CriareventoService);
    expect(service).toBeTruthy();
  });
});
