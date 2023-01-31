import {TestBed} from '@angular/core/testing';

import {NutzerService} from './nutzer.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";

describe('NutzerService', () => {
  let service: NutzerService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [HttpClientTestingModule, BrowserDynamicTestingModule],
      imports: [NutzerService]
    });
    service = TestBed.inject(NutzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
