import { createReducer, on } from '@ngrx/store';

import { nameSet } from './quiz.actions';
import { QuizQuestion } from './quiz.models';

export const QUIZ_FEATURE_KEY = 'quiz';

export interface QuizState {
  name: string;
  isQuizActive: boolean;
  quizQuestions: QuizQuestion[];
  selectedQuizQuestionIndex: number | null;
  currentOptionIndex: number | null;
  correctAnswerCount: number;
}

export const initialState: QuizState = {
  name: 'Jessica',
  isQuizActive: false,
  quizQuestions: [],
  selectedQuizQuestionIndex: null,
  currentOptionIndex: null,
  correctAnswerCount: 0,
};

export const quizReducer = createReducer(
  initialState,
  on(nameSet, (state, { name }) => ({ ...state, name }))
);
