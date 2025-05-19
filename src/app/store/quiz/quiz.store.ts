import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { QuizService } from '../../services/quiz/quiz.service';
import { QuizDetails } from '../../services/quiz/types';

export const QuizStore = signalStore(
  { providedIn: 'root' },
  withState(QuizService.emptyQuiz),
  withMethods(store => (
    {
      updateQuiz(quiz: QuizDetails) {
        patchState(store, quiz);
      },
    }
  )));