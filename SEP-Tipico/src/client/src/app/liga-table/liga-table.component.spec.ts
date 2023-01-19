import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LigaTableComponent} from './liga-table.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('LigaTableComponent', () => {
  let component: LigaTableComponent;
  let fixture: ComponentFixture<LigaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [LigaTableComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LigaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
