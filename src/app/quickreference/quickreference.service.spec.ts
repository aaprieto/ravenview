import { TestBed, inject } from '@angular/core/testing';

import { QuickreferenceService } from './quickreference.service';

describe('QuickreferenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuickreferenceService]
    });
  });

  it('should be created', inject([QuickreferenceService], (service: QuickreferenceService) => {
    expect(service).toBeTruthy();
  }));
});
