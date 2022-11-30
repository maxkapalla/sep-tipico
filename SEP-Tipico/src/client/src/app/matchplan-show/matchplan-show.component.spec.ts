import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MatchPlanShowComponent} from './matchplan-show.component';

describe('MatchPlanShowComponent', () => {
  let component: MatchPlanShowComponent;
  let fixture: ComponentFixture<MatchPlanShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchPlanShowComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MatchPlanShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
