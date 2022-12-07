import { TestBed } from '@angular/core/testing';

import { TippRundeService } from './tipp-runde.service';

describe('TippRundeService', () => {
  let service: TippRundeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TippRundeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
