import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TipprundeJoinComponent} from './tipprunde-join.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('TipprundeJoinComponent', () => {
  let component: TipprundeJoinComponent;
  let fixture: ComponentFixture<TipprundeJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipprundeJoinComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TipprundeJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
