import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigaChangeComponent } from './liga-change.component';

describe('LigaChangeComponent', () => {
  let component: LigaChangeComponent;
  let fixture: ComponentFixture<LigaChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigaChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LigaChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
