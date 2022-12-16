import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MatchPlanShowComponent} from './matchplan-show.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('MatchPlanShowComponent', () => {
  let component: MatchPlanShowComponent;
  let fixture: ComponentFixture<MatchPlanShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchPlanShowComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule]
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
