import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TopthreeComponent} from './topthree.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('TopthreeComponent', () => {
  let component: TopthreeComponent;
  let fixture: ComponentFixture<TopthreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopthreeComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TopthreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
