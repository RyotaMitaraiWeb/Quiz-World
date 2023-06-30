import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizListItemComponent } from './quiz-list-item.component';
import { AppStoreModule } from '../../store/app-store.module';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../types/store/store.types';

describe('QuizListItemComponent', () => {
  let component: QuizListItemComponent;
  let fixture: ComponentFixture<QuizListItemComponent>;

  let router: Router;
  let store: Store<IAppStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuizListItemComponent, AppStoreModule]
    });
    fixture = TestBed.createComponent(QuizListItemComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
