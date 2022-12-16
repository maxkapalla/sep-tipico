import {TestBed} from '@angular/core/testing';

import {TippService} from './tipp.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TippService', () => {
  let service: TippService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TippService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TippService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
