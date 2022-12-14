import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MatchPlanCreateComponent} from './matchplan-create.component';

describe('MatchPlanCreateComponent', () => {
  let component: MatchPlanCreateComponent;
  let fixture: ComponentFixture<MatchPlanCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchPlanCreateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MatchPlanCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
