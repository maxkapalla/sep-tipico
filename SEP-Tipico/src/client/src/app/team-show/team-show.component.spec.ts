import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamShowComponent} from './team-show.component';
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TeamCShowComponent', () => {
  let component: TeamShowComponent;
  let fixture: ComponentFixture<TeamShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamShowComponent],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TeamShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
