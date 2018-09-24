import { TestBed, inject } from '@angular/core/testing';

import { ValidateTokenService } from './validate-token.service';

describe('ValidateTokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidateTokenService]
    });
  });

  it('should be created', inject([ValidateTokenService], (service: ValidateTokenService) => {
    expect(service).toBeTruthy();
  }));
});
