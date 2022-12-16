import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterAdminComponent} from './register-admin.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('RegisterAdminComponent', () => {
  let component: RegisterAdminComponent;
  let fixture: ComponentFixture<RegisterAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterAdminComponent], imports: [HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
