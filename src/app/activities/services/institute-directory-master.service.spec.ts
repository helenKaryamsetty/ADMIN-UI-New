import { TestBed } from '@angular/core/testing';

import { InstituteDirectoryMasterService } from './institute-directory-master.service';

describe('InstituteDirectoryMasterService', () => {
  let service: InstituteDirectoryMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstituteDirectoryMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
