import { TestBed, inject } from '@angular/core/testing';

import { DonutService } from './donut.service';

xdescribe('DonutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DonutService]
    });
  });

  it('should be created', inject([DonutService], (service: DonutService) => {
    expect(service).toBeTruthy();
  }));
});
