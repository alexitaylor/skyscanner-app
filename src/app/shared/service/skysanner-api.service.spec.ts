import { TestBed } from '@angular/core/testing';

import { skyscannerApiService } from './skyscanner-api.service';

describe('skyscannerApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: skyscannerApiService = TestBed.get(skyscannerApiService);
    expect(service).toBeTruthy();
  });
});
