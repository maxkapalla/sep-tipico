import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WillkommenBarComponent } from './willkommen-bar.component';

describe('WillkommenBarComponent', () => {
  let component: WillkommenBarComponent;
  let fixture: ComponentFixture<WillkommenBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WillkommenBarComponent ]
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
