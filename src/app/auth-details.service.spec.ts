import { TestBed } from '@angular/core/testing';

import { AuthDetailsService } from './auth-details.service';

describe('AuthDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthDetailsService = TestBed.get(AuthDetailsService);
    expect(service).toBeTruthy();
  });
});
