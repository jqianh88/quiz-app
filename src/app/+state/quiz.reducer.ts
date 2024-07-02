import {createReducer, on} from '@ngrx/store';

import {abcSet, defSet} from './quiz.actions';

export const QUIZ_FEATURE_KEY = 'quiz';

export interface QuizState {
  abc: string;
  def: string;
}

export const initialState: QuizState = {
  abc: '098',
  def: 'kdjfalksdjfk',
};

export const quizReducer = createReducer(
  initialState,
  on(abcSet, (state, { abc }) => ({ ...state, abc })),
  on(defSet, (state, { def }) => ({ ...state, def }))
);
