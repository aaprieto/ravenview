import { TestBed, inject } from '@angular/core/testing';

import { FQuickreferenceService } from './f-quickreference.service';

describe('FQuickreferenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FQuickreferenceService]
    });
  });

  it('should be created', inject([FQuickreferenceService], (service: FQuickreferenceService) => {
    expect(service).toBeTruthy();
  }));
});
