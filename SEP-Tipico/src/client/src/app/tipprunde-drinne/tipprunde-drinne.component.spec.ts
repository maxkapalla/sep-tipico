import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipprundeDrinneComponent } from './tipprunde-drinne.component';

describe('TipprundeDrinneComponent', () => {
  let component: TipprundeDrinneComponent;
  let fixture: ComponentFixture<TipprundeDrinneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipprundeDrinneComponent ]
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
