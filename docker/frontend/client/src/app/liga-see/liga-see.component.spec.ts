import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigaSeeComponent } from './liga-see.component.ts';

describe('LigaSeeComponent', () => {
  let component: LigaSeeComponent;
  let fixture: ComponentFixture<LigaSeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigaSeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LigaSeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
