import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { question } from '../../common/questionTypes';
import { computed } from '@angular/core';

type QuestionTypesState = Record<question, number>;

export const initialQuestionTypesState: QuestionTypesState = {
  SingleChoice: 0,
  MultipleChoice: 0,
  Text: 0,
};

export const QuestionTypesStore = signalStore(
  { providedIn: 'root'},
  withState(initialQuestionTypesState),
  withComputed(store => (
    {
      total: computed(() => Object.values(store)
        .reduce((total, current) => total + current(), 0)),
    }
  )),
  withMethods(store => (
      {
        updateCount(typeToBeRemoved: question, typeToBeAdded: question) {
          patchState(store, (state) => {
            const newState = {...state};
            newState[typeToBeRemoved]--;
            newState[typeToBeAdded]++;

            return newState;
          });
        },
        incrementQuestionType(type: question) {
          patchState(store, (state) => {
            const newState = {...state};
            newState[type]++;

            return newState;
          });
        },
        decrementQuestionType(type: question) {
          patchState(store, (state) => {
            const newState = {...state};
            newState[type]--;

            return newState;
          });
        },
      }
    ),
  ),
);