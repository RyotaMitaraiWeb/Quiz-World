import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllQuizzesComponent } from './all-quizzes.component';
import { AppStoreModule } from '../../../store/app-store.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AllQuizzesComponent', () => {
  let component: AllQuizzesComponent;
  let fixture: ComponentFixture<AllQuizzesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AllQuizzesComponent,
        AppStoreModule,
        RouterTestingModule,
        NoopAnimationsModule
      ]
    });
    fixture = TestBed.createComponent(AllQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
