import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TippHilfeComponent} from './tipphilfe.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('TippHilfeComponent', () => {
  let component: TippHilfeComponent;
  let fixture: ComponentFixture<TippHilfeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TippHilfeComponent],
      imports: [HttpClientTestingModule, BrowserDynamicTestingModule, FormsModule, ReactiveFormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TippHilfeComponent);
    component = fixture.componentInstance;
    component.hilfe.set(BigInt("1000"), 5)
    component.hilfe.set(BigInt("2000"), 10)
    component.match.teamA = BigInt("1000");
    component.match.teamB = BigInt("2000");

    component.ligen = [{
      name: "test",
      id: BigInt("10"),
      url: ""
    }, {
      name: "test2",
      id: BigInt("20"),
      url: ""
    }]
    component.ligaid = BigInt("10");

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate reasonable quote', () => {
    component.onShowTip();
    expect(component.quote).toBeCloseTo(0.5)
  })
  it('select correct liga', () => {
    component.onSelectLiga();
    expect(component.liga.id).toBe(BigInt("10"));
    expect(component.liga.name).toBe("test");
  })

});
