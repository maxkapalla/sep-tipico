import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TippRundeCreateComponent } from './tipp-runde-create.component';

describe('TippRundeCreateComponent', () => {
  let component: TippRundeCreateComponent;
  let fixture: ComponentFixture<TippRundeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TippRundeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TippRundeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
