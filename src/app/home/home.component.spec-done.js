import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { GithubService } from '../common/github-service/github.service';
import { OrderService } from '../order/order.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  // let githubService: MockGithubService;
  let githubService: GithubService;
  let router: MockRouter;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // imports for spy approach after doing the mocked approach
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      // providers
      providers: [
        // { // Mocked approach
        //   provide: GithubService,
        //   useClass: MockGithubService
        // },
        GithubService, // spies approach
        OrderService,
        {
          provide: Router,
          useClass: MockRouter
        }
      ],
      declarations: [HomeComponent],
      // isolate,
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    githubService = TestBed.get(GithubService);
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges(); // ngOnInit only runs once per component!
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // can render angular version (mocked)
  // it('can render angular version (mocked)', () => {
  //   githubService.returnValue = 'unittest';
  //   fixture.detectChanges(); // cause ngOnInit to run
  //   expect(fixture.nativeElement.innerText).toContain('Current Angular Release is version unittest.');
  // });

  // can render angular version (spies) then back to slides
  it('can render angular version (spies)', () => {
    const spy = spyOn(githubService, 'getAngularLatestVersion').and.callFake(() => {
      githubService['angularVersionSubject'].next('unittest');
    });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(fixture.nativeElement.innerText).toContain('Current Angular Release is version unittest.');
  });

  // routes on button click
  it('routes on button click', () => {
    fixture.detectChanges();
    const spy = spyOn(router, 'navigate');
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const button = buttons.find((btn) => btn.nativeElement.innerText === 'View Orders');
    button.nativeElement.click();
    expect(spy).toHaveBeenCalledWith(['orderdetails', -1]);
  });
});

// MockGithubService
class MockGithubService {
  returnValue: string;

  angularVersionSubject$: Subject<string> = new Subject<string>();

  getAngularLatestVersion() {
    this.angularVersionSubject$.next(this.returnValue);
  }
}

class MockRouter {
  navigate(params: []) {
    return params;
  }
}
