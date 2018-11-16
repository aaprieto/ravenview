import { TestBed, inject } from '@angular/core/testing';

import { SoiltemperatureService } from './soiltemperature.service';

describe('SoiltemperatureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoiltemperatureService]
    });
  });

  it('should be created', inject([SoiltemperatureService], (service: SoiltemperatureService) => {
    expect(service).toBeTruthy();
  }));
});
