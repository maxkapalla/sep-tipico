import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamShowComponent} from './team-show.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('TeamCShowComponent', () => {
  let component: TeamShowComponent;
  let fixture: ComponentFixture<TeamShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamShowComponent],
      imports: [RouterTestingModule]
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
