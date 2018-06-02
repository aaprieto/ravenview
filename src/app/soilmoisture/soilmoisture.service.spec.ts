import { TestBed, inject } from '@angular/core/testing';

import { SoilmoistureService } from './soilmoisture.service';

describe('SoilmoistureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoilmoistureService]
    });
  });

  it('should be created', inject([SoilmoistureService], (service: SoilmoistureService) => {
    expect(service).toBeTruthy();
  }));
});
