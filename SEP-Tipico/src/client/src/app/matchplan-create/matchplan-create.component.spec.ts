import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MatchPlanCreateComponent} from './matchplan-create.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('MatchPlanCreateComponent', () => {
  let component: MatchPlanCreateComponent;
  let fixture: ComponentFixture<MatchPlanCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchPlanCreateComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule]
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
