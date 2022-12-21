import { TestBed } from '@angular/core/testing';

import { AdminBenchService } from './admin-bench.service';

describe('AdminBenchService', () => {
  let service: AdminBenchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminBenchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
