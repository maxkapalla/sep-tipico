import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SpielplanCsvComponent } from './spielplan-csv.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        SpielplanCsvComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(SpielplanCsvComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Angular7-readCSV'`, () => {
    const fixture = TestBed.createComponent(SpielplanCsvComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Angular7-readCSV');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(SpielplanCsvComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Angular7-readCSV!');
  });
});
