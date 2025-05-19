import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultCardComponent } from './search-result-card.component';
import { By } from '@angular/platform-browser';
import { QuizListItem } from '../../../services/quiz/types';
import { provideRouter } from '@angular/router';

describe('SearchResultCardComponent', () => {
  let component: SearchResultCardComponent;
  let fixture: ComponentFixture<SearchResultCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResultCardComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchResultCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Displays a shortened description if it is too long', () => {
    const quiz: QuizListItem = {
      id: 0,
      title: '',
      description: 'a'.repeat(component.DESCRIPTION_MAX_LENGTH + 1),
      instantMode: false,
      createdOn: '',
    };

    fixture.componentRef.setInput('quiz', quiz);
    fixture.detectChanges();

    const descriptionElement = fixture.debugElement.query(
      By.css('.search-result-description'),
    ).nativeElement as HTMLParagraphElement;
    const description = descriptionElement.textContent;

    expect(description?.endsWith('...'));
    expect(description?.length).toBe(component.DESCRIPTION_MAX_LENGTH + 3);
  });
});
