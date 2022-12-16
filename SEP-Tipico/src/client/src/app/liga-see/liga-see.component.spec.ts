import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LigaSeeComponent} from './liga-see.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('LigaSeeComponent', () => {
  let component: LigaSeeComponent;
  let fixture: ComponentFixture<LigaSeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [LigaSeeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LigaSeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
