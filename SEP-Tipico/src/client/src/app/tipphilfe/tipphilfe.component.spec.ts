import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TipphilfeComponent} from './tipphilfe.component';

describe('TeamCShowComponent', () => {
  let component: TipphilfeComponent;
  let fixture: ComponentFixture<TipphilfeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipphilfeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TipphilfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
