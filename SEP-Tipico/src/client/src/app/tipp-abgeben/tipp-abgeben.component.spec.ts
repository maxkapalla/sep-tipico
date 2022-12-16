import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TippAbgebenComponent} from './tipp-abgeben.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TeamCShowComponent', () => {
  let component: TippAbgebenComponent;
  let fixture: ComponentFixture<TippAbgebenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TippAbgebenComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TippAbgebenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
