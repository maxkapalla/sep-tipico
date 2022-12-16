import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TopthreeteamComponent} from './topthree-team.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('TopthreeteamComponent', () => {
  let component: TopthreeteamsComponent;
  let fixture: ComponentFixture<TopthreeteamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopthreeteamsComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TopthreeteamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
