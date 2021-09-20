import { TestBed } from '@angular/core/testing';

import { ChangepasswordService } from './changepassword.service';

describe('ChangepasswordService', () => {
  let service: ChangepasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangepasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
