import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInstituteDirectoryComponent } from './edit-institute-directory.component';

describe('EditInstituteDirectoryComponent', () => {
  let component: EditInstituteDirectoryComponent;
  let fixture: ComponentFixture<EditInstituteDirectoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInstituteDirectoryComponent],
    });
    fixture = TestBed.createComponent(EditInstituteDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
