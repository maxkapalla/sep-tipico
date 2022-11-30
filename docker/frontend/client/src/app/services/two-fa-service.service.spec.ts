import { TestBed } from '@angular/core/testing';

import { TwoFaServiceService } from './two-fa-service.service';

describe('TwoFaServiceService', () => {
  let service: TwoFaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwoFaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
