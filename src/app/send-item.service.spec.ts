import { TestBed } from '@angular/core/testing';

import { SendItemService } from './send-item.service';

describe('SendItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendItemService = TestBed.get(SendItemService);
    expect(service).toBeTruthy();
  });
});
