import { TestBed } from '@angular/core/testing';

import { GeldWetteService } from './geld-wette.service';

describe('GeldWetteService', () => {
  let service: GeldWetteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeldWetteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
