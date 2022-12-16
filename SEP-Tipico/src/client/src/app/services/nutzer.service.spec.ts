import {TestBed} from '@angular/core/testing';

import {NutzerService} from './nutzer.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('NutzerService', () => {
  let service: NutzerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutzerService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(NutzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
