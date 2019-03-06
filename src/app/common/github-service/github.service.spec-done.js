import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { GithubService } from './github.service';
import { GithubResponse } from './github-response.interface';

describe('GithubService', () => {
  // globals
  let service: GithubService;
  let controller: HttpTestingController;
  let response: GithubResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [GithubService]
    });

    service = TestBed.get(GithubService);
    controller = TestBed.get(HttpTestingController);
    response = {
      name: 'unittest',
      zipball_url: 'http://api.github.com',
      tarball_url: 'http://api.github.com',
      commit: {
        sha: '123',
        url: 'http://api.github.com'
      }
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // test that a get request is made (not the result) async
  it('makes a GET', () => {
    service.getAngularLatestVersion();
    const request: TestRequest = controller.expectOne('https://api.github.com/repos/angular/angular/tags');
    expect(request.request.method).toBe('GET');
    expect(request.request.body).toBeNull();
  });

  // test that the version is returned async
  it('returns undefined if no numeric version found', () => {
    service.angularVersionSubject$.subscribe(
      (version: string) => {
        expect(version).toBeUndefined();
      }
    );
    service.getAngularLatestVersion();
    controller.expectOne('https://api.github.com/repos/angular/angular/tags')
      .flush([response, response, response]);
  });

  it('returns undefined if empty result from github', () => {
    service.angularVersionSubject$.subscribe(
      (version: string) => {
        expect(version).toBeUndefined();
      }
    );
    service.getAngularLatestVersion();
    controller.expectOne('https://api.github.com/repos/angular/angular/tags')
      .flush([]);
  });

  it('returns a version', () => {
    service.angularVersionSubject$.subscribe(
      (version: string) => {
        expect(version).toBe('123.0.0');
      }
    );
    service.getAngularLatestVersion();
    controller.expectOne('https://api.github.com/repos/angular/angular/tags')
      .flush([
        response, // 'unittest' shouldn't match
        { ...response, name: 'a123.0.0' }, // 'a' shouldn't match
        { ...response, name: '123.0.0' }, // 1 should match
        { ...response, name: '234.1.1' } // .find won't get this far
      ]);
  });

  // it('can handle no data', () => {
  //   service.angularVersionSubject$.subscribe(
  //     (version: string) => {
  //       expect(version).toBeUndefined();
  //     }
  //   );
  //   service.getAngularLatestVersion();
  //   controller.expectOne('https://api.github.com/repos/angular/angular/tags')
  //     .flush(undefined, { status: 204, statusText: '' });
  // });
});
