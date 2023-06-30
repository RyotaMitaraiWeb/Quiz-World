import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizListItemComponent } from './quiz-list-item.component';
import { AppStoreModule } from '../../store/app-store.module';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../types/store/store.types';
import { RouterTestingModule } from '@angular/router/testing';

describe('QuizListItemComponent', () => {
  let component: QuizListItemComponent;
  let fixture: ComponentFixture<QuizListItemComponent>;

  let router: Router;
  let store: Store<IAppStore>;

  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        QuizListItemComponent,
        AppStoreModule,
        RouterTestingModule
      ],
    });
    fixture = TestBed.createComponent(QuizListItemComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
    fixture.detectChanges();
    element = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    console.log(component.quiz);
    
    expect(component).toBeTruthy();
  });

  describe('Component tests', () => {
    it('Renders title, a short description, creation date, and a hyperlink successfully', () => {
      component.quiz = {
        id: 1,
        title: 'a',
        description: 'a',
        createdOn: '03/01/2023',
        updatedOn: undefined,
        instantMode: false,
      };

      fixture.detectChanges();

      const title = element.querySelector('.title');
      const description = element.querySelector('.description');
      const createdOn = element.querySelector('.creation-date');
      const updatedOn = element.querySelector('.update-date');
      const instantMode = element.querySelector('.instant-mode');
      const link = element.querySelector('.quiz-link') as HTMLAnchorElement;

      expect(title?.textContent).toBe('a');
      expect(description?.textContent).toBe('a');

      expect(updatedOn).toBeNull();
      expect(instantMode).toBeNull();

      expect(link.href.endsWith('/1')).toBeTrue();
    });

    it('Renders with a date of update if such is provided', () => {
      component.quiz = {
        id: 1,
        title: 'a',
        description: 'a',
        createdOn: '03/01/2023',
        updatedOn: '04/01/2023',
        instantMode: false,
      };

      fixture.detectChanges();

      const updatedOn = element.querySelector('.update-date');
      expect(updatedOn?.textContent).not.toBeNull();
    });

    it('Renders with a chip for instant mode', () => {
      component.quiz = {
        id: 1,
        title: 'a',
        description: 'a',
        createdOn: '01/03/2023',
        updatedOn: '01/04/2023',
        instantMode: true,
      };

      fixture.detectChanges();

      const instantMode = element.querySelector('.instant-mode');
      expect(instantMode).not.toBeNull();
    });

    it('Renders a shortened description', () => {
      component.quiz = {
        id: 1,
        title: 'a',
        description: 'a'.repeat(51),
        createdOn: '01/03/2023',
        updatedOn: '01/04/2023',
        instantMode: true,
      };

      fixture.detectChanges();
      const description = element.querySelector('.description');

      expect(description?.textContent).toBe('a'.repeat(50) + '...');
    });
  });
});
