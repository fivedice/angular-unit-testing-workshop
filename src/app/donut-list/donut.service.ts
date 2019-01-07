import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Donut } from '../models/donut.interface';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class DonutService {

  constructor(private http: HttpClient) { }

  getDonuts(): Observable<Donut[]> {
    return this.http.get<Donut[]>('../assets/donuts.json');
  }
}
