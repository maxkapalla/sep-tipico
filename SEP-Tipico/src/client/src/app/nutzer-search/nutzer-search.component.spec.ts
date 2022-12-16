import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NutzerSearchComponent} from './nutzer-search.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('NutzerSearchComponent', () => {
  let component: NutzerSearchComponent;
  let fixture: ComponentFixture<NutzerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NutzerSearchComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NutzerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
