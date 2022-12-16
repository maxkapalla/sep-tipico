import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TopthreeTeamComponent} from './topthree-team.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('TopthreeTeamComponent', () => {
  let component: TopthreeTeamComponent;
  let fixture: ComponentFixture<TopthreeTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopthreeTeamComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TopthreeTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
