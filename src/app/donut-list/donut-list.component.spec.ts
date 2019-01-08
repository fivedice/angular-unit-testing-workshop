import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutListComponent } from './donut-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DonutService } from './donut.service';
import { of } from 'rxjs';
import { Donut } from '../models/donut.interface';

xdescribe('DonutListComponent', () => {
  let component: DonutListComponent;
  let fixture: ComponentFixture<DonutListComponent>;
  const mockDonutService = jasmine.createSpyObj('DonutService', ['getDonuts']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonutListComponent ],
      providers: [
        { provide: DonutService, useValue: mockDonutService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockDonutService {
  getDonuts() {
    return of(<Donut[]>[{
      id: 0,
      name: '0 Donut'
    }, {
      id: 1,
      name: '1 Donut'
    }]);
  }
}
