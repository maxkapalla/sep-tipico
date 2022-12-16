import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TipprundeDrinneComponent} from './tipprunde-drinne.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('TipprundeDrinneComponent', () => {
  let component: TipprundeDrinneComponent;
  let fixture: ComponentFixture<TipprundeDrinneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipprundeDrinneComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TipprundeDrinneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
