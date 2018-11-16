import { TestBed, inject } from '@angular/core/testing';

import { IUserlistService } from './i-userlist.service';

describe('IUserlistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IUserlistService]
    });
  });

  it('should be created', inject([IUserlistService], (service: IUserlistService) => {
    expect(service).toBeTruthy();
  }));
});
