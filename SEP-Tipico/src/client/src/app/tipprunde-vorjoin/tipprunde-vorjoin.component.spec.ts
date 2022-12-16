import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TipprundeVorjoinComponent} from './tipprunde-vorjoin.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('TipprundeVorjoinComponent', () => {
  let component: TipprundeVorjoinComponent;
  let fixture: ComponentFixture<TipprundeVorjoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipprundeVorjoinComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TipprundeVorjoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
