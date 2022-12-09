import {TestBed} from '@angular/core/testing';
import {TippHilfeService} from "./tipphilfe.service";

describe('TippRundeService', () => {
  let service: TippHilfeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TippHilfeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
