import {TestBed} from '@angular/core/testing';

import {TippRundeService} from './tipp-runde.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TippRundeService', () => {
  let service: TippRundeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TippRundeService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TippRundeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
