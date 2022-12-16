import {TestBed} from '@angular/core/testing';

import {FileUploadService} from "./file-upload.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('FileUploadService', () => {
  let service: FileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploadService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
