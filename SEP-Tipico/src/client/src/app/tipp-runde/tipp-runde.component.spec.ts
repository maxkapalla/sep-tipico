import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TippRundeComponent} from './tipp-runde.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TippRundeComponent', () => {
  let component: TippRundeComponent;
  let fixture: ComponentFixture<TippRundeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TippRundeComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TippRundeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
