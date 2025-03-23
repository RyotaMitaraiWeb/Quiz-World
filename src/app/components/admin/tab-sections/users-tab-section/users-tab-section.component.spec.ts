import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTabSectionComponent } from './users-tab-section.component';

describe('UsersTabSectionComponent', () => {
  let component: UsersTabSectionComponent;
  let fixture: ComponentFixture<UsersTabSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersTabSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersTabSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
