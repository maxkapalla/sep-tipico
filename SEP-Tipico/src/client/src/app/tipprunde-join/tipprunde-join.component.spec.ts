import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipprundeJoinComponent } from './tipprunde-join.component';

describe('TipprundeJoinComponent', () => {
  let component: TipprundeJoinComponent;
  let fixture: ComponentFixture<TipprundeJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipprundeJoinComponent ]
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
