import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  });

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  // should render title
  it('should render title', () => {
    app.name = 'Donut Shoppe';
    fixture.detectChanges();
    expect(fixture.nativeElement.innerText).toContain('Donut Shoppe');
  });

  // should have default title in H1
  it('should have default title in H1', () => {
    expect(app.name).toBe('Donut Shop');
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('h1')).nativeElement.innerText)
      .toContain('Donut Shop');
  });
});
