import { TestBed } from '@angular/core/testing';

import { ApiIMDbTop100Service } from './api-imdb-top-100.service';

describe('ApiIMDbTop100Service', () => {
  let service: ApiIMDbTop100Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiIMDbTop100Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
