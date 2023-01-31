import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SidebarUserComponent} from './sidebar-user.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SidebarUserComponent', () => {
  let component: SidebarUserComponent;
  let fixture: ComponentFixture<SidebarUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarUserComponent], imports: [HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SidebarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
