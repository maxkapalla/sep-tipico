import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TwoFAComponent} from './two-fa.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('TwoFAComponent', () => {
  let component: TwoFAComponent;
  let fixture: ComponentFixture<TwoFAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwoFAComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TwoFAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
