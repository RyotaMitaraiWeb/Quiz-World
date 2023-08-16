import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesListPageComponent } from './roles-list-page.component';

describe('RolesListPageComponent', () => {
  let component: RolesListPageComponent;
  let fixture: ComponentFixture<RolesListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RolesListPageComponent]
    });
    fixture = TestBed.createComponent(RolesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
