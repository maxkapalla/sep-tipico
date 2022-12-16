import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WillkommenBarComponent} from './willkommen-bar.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('WillkommenBarComponent', () => {
  let component: WillkommenBarComponent;
  let fixture: ComponentFixture<WillkommenBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WillkommenBarComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WillkommenBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
