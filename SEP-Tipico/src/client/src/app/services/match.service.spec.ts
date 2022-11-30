import {TestBed} from '@angular/core/testing';

import {LigaService} from './liga.service';

describe('MatchService', () => {
  let service: LigaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LigaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
