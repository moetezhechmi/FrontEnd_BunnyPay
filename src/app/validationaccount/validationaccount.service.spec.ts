import { TestBed } from '@angular/core/testing';

import { ValidationaccountService } from './validationaccount.service';

describe('ValidationaccountService', () => {
  let service: ValidationaccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationaccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
