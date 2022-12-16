import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TippHilfeComponent} from './tipphilfe.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TeamCShowComponent', () => {
  let component: TippHilfeComponent;
  let fixture: ComponentFixture<TippHilfeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TippHilfeComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TippHilfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
