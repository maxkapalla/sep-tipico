import { TestBed } from '@angular/core/testing';

import { NutzerService } from './nutzer.service';

describe('NutzerService', () => {
  let service: NutzerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
