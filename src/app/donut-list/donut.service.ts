import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Donut } from '../models/donut.interface';
import { Subject } from 'rxjs';

@Injectable()
export class DonutService {

  donutsChanged$: Subject<Donut[]> = new Subject<Donut[]>();

  constructor(private http: HttpClient) { }

  getDonuts() {
    this.http.get<Donut[]>('../assets/donuts.json').subscribe((donuts: Donut[]) => {
      this.donutsChanged$.next(donuts);
    });
  }
}
