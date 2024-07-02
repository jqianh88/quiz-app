import {createFeatureSelector, createSelector} from '@ngrx/store';

import {QUIZ_FEATURE_KEY, QuizState} from './quiz.reducer';

const selectQuizState = createFeatureSelector<QuizState>(QUIZ_FEATURE_KEY);

export const getAbc = createSelector(
  selectQuizState,
  (state): string => state.abc
);
