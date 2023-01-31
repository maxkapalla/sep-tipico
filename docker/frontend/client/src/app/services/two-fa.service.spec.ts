import {TestBed} from '@angular/core/testing';

import {TwoFaService} from './two-fa.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TwoFaService', () => {
  let service: TwoFaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TwoFaService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TwoFaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
