import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnfragenOrganisierenComponent } from './anfragen-organisieren.component';

describe('AnfragenOrganisierenComponent', () => {
  let component: AnfragenOrganisierenComponent;
  let fixture: ComponentFixture<AnfragenOrganisierenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnfragenOrganisierenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnfragenOrganisierenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
