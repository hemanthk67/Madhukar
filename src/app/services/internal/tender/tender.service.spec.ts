import { TestBed } from '@angular/core/testing';

import { TenderService } from './tender.service';

describe('TenderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TenderService = TestBed.get(TenderService);
    expect(service).toBeTruthy();
  });
});
