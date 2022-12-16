import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TipperProfileComponent} from './tipper-profile.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TipperProfileComponent', () => {
  let component: TipperProfileComponent;
  let fixture: ComponentFixture<TipperProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipperProfileComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TipperProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
