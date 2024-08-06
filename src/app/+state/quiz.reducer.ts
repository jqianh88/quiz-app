import {createReducer, on} from '@ngrx/store';

import * as quizActions from './quiz.actions';
import {QuizQuestion} from './quiz.models';

export const QUIZ_FEATURE_KEY = 'quiz';

export interface QuizState {
  name: string | null;
  quizQuestions: QuizQuestion[];
  isQuizActive: boolean;
  selectedQuizQuestionIndex: number | null;
  currentOptionIndex: number | null;
  correctAnswerCount: number;
  pointsPerCorrectAnswer: number;
}

export const initialState: QuizState = {
  name: null,
  quizQuestions: [],
  isQuizActive: false,
  selectedQuizQuestionIndex: null,
  currentOptionIndex: null,
  correctAnswerCount: 0,
  pointsPerCorrectAnswer: 3,
};

export const quizReducer = createReducer(
  initialState,

  on(quizActions.nameSet, (state, {name}) => ({...state, name})),
  on(quizActions.questionsLoaded, (state, {quizQuestions}) => ({...state, quizQuestions})),
  on(quizActions.isQuizActiveSet, (state, {isQuizActive}) => ({...state, isQuizActive})),
  on(quizActions.selectedQuizQuestionIndexSet, (state, {selectedQuizQuestionIndex}) => ({...state, selectedQuizQuestionIndex})),
  on(quizActions.currentOptionIndexSet, (state, {currentOptionIndex}) => ({...state, currentOptionIndex})),
  on(quizActions.correctAnswerCountSet, (state, {correctAnswerCount}) => ({...state, correctAnswerCount}))
);
