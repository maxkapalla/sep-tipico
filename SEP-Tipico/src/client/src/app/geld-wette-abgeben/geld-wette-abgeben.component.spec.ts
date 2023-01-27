import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeldWetteAbgebenComponent } from './geld-wette-abgeben.component';

describe('GeldWetteAbgebenComponent', () => {
  let component: GeldWetteAbgebenComponent;
  let fixture: ComponentFixture<GeldWetteAbgebenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeldWetteAbgebenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeldWetteAbgebenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
