import { TestBed } from '@angular/core/testing';

import { MocdocService } from './mocdoc.service';

describe('MocdocService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MocdocService = TestBed.get(MocdocService);
    expect(service).toBeTruthy();
  });
});
