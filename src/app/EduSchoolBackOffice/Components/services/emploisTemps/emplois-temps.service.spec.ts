import { TestBed } from '@angular/core/testing';

import { EmploisTempsService } from './emplois-temps.service';

describe('EmploisTempsService', () => {
  let service: EmploisTempsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmploisTempsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
