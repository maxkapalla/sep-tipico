import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigaCreateComponent } from './liga-create.component.ts';

describe('LigaSeeComponent', () => {
  let component: LigaCreateComponent;
  let fixture: ComponentFixture<LigaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigaCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LigaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
