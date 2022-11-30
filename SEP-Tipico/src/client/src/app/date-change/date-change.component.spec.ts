import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateChangeComponent } from './date-change.component';

describe('DateChangeComponent', () => {
  let component: DateChangeComponent;
  let fixture: ComponentFixture<DateChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateChangeComponent ]
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
