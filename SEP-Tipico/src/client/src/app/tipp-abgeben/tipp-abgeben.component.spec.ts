import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TippAbgebenComponent} from './tipp-abgeben.component';

describe('TeamCShowComponent', () => {
  let component: TippAbgebenComponent;
  let fixture: ComponentFixture<TippAbgebenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TippAbgebenComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TippAbgebenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
