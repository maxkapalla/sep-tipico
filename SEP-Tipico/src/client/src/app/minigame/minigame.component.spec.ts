import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MinigameComponent} from './minigame.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";
import {NutzerService} from "../services/nutzer.service";

describe('MinigameComponent', () => {
  let component: MinigameComponent;
  let fixture: ComponentFixture<MinigameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MinigameComponent],
      imports: [HttpClientTestingModule, BrowserDynamicTestingModule, NutzerService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MinigameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*  it('should icrease', () => {
      let kontostand = component.kontostand;
      component.onClick();
      expect(kontostand + BigInt(100) == component.kontostand).toBeTruthy();
    });*/


});
