import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MinigameComponent} from './minigame.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('HeaderComponent', () => {
  let component: MinigameComponent;
  let fixture: ComponentFixture<MinigameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MinigameComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MinigameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
