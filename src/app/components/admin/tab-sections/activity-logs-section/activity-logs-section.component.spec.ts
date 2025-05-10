import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLogsSectionComponent } from './activity-logs-section.component';

describe('ActivityLogsSectionComponent', () => {
  let component: ActivityLogsSectionComponent;
  let fixture: ComponentFixture<ActivityLogsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityLogsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityLogsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
