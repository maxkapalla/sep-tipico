import {TestBed} from '@angular/core/testing';
import {TippHilfeService} from "./tipphilfe.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TippHilfeService', () => {
  let service: TippHilfeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TippHilfeService]
      , imports: [HttpClientTestingModule]

    });
    service = TestBed.inject(TippHilfeService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
