import { TestBed, inject } from '@angular/core/testing';

import { AirtemperatureService } from './airtemperature.service';

describe('AirtemperatureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AirtemperatureService]
    });
  });

  it('should be created', inject([AirtemperatureService], (service: AirtemperatureService) => {
    expect(service).toBeTruthy();
  }));
});
