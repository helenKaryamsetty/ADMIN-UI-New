import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteDirectoryMasterComponent } from './institute-directory-master.component';

describe('InstituteDirectoryMasterComponent', () => {
  let component: InstituteDirectoryMasterComponent;
  let fixture: ComponentFixture<InstituteDirectoryMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstituteDirectoryMasterComponent],
    });
    fixture = TestBed.createComponent(InstituteDirectoryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
