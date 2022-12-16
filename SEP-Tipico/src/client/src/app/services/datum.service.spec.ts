import {TestBed} from '@angular/core/testing';

import {DatumService} from './datum.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('DatumService', () => {
  let service: DatumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatumService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DatumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
