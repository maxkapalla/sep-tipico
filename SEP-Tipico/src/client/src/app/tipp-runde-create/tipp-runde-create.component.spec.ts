import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TippRundeCreateComponent} from './tipp-runde-create.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('TippRundeCreateComponent', () => {
  let component: TippRundeCreateComponent;
  let fixture: ComponentFixture<TippRundeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TippRundeCreateComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TippRundeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
