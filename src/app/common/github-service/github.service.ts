import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GithubResponse } from './github-response.interface';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class GithubService {

  angularVersionSubject$: Observable<string>;

  private angularVersionSubject: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
    this.angularVersionSubject$ = this.angularVersionSubject.asObservable();
  }

  getAngularLatestVersion() {
    this.http.get<GithubResponse[]>('https://api.github.com/repos/angular/angular/tags')
      .subscribe((response: GithubResponse[]) => {
        const latest = response.find((item: GithubResponse) => {
          return !isNaN(parseFloat(item.name.substring(0, 1)));
        });
        this.angularVersionSubject.next(latest ? latest.name : undefined);
      });
  }
}
