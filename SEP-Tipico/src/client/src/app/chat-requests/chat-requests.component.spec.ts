import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRequestsComponent } from './chat-requests.component';

describe('ChatRequestsComponent', () => {
  let component: ChatRequestsComponent;
  let fixture: ComponentFixture<ChatRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
