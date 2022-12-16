import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DateChangeComponent} from './date-change.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('DateChangeComponent', () => {
  let component: DateChangeComponent;
  let fixture: ComponentFixture<DateChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateChangeComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DateChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
