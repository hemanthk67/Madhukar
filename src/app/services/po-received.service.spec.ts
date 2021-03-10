import { TestBed } from '@angular/core/testing';

import { PoReceivedService } from './po-received.service';

describe('PoReceivedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PoReceivedService = TestBed.get(PoReceivedService);
    expect(service).toBeTruthy();
  });
});
