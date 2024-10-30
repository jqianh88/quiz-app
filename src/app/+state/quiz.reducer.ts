import {createReducer, on} from '@ngrx/store';

import * as quizActions from './quiz.actions';
import {QuizQuestion} from './quiz.models';

export const QUIZ_FEATURE_KEY = 'quiz';

export interface QuizState {
  name: string | null;
  quizQuestions: Map<QuizQuestion['id'], QuizQuestion>;
  isQuizActive: boolean;
  selectedQuizQuestionId?: QuizQuestion['id'];
  correctAnswerCount: number;
  pointsPerCorrectAnswer: number;
  isFinalMode: boolean;
}

export const initialState: QuizState = {
  name: 'hi there',
  quizQuestions: new Map(),
  isQuizActive: true,
  correctAnswerCount: 0,
  pointsPerCorrectAnswer: 5,
  isFinalMode: true,
};

export const quizReducer = createReducer<QuizState>(
  initialState,

  on(quizActions.nameSet, (state, {name}) => ({...state, name})),
  on(quizActions.questionsLoaded, (state, {quizQuestions}) => ({...state, quizQuestions})),
  on(quizActions.isQuizActiveSet, (state, {isQuizActive}) => ({...state, isQuizActive})),
  on(quizActions.selectedQuizQuestionIdSet, (state, {selectedQuizQuestionId}) => ({...state, selectedQuizQuestionId})),
  on(
    quizActions.currentOptionIndexSet,

    (state, {quizQuestionId, answerIndex}) => {
      const question = state.quizQuestions.get(quizQuestionId);
      return question === undefined
        ? state
        : {
            ...state,
            quizQuestions: new Map(state.quizQuestions).set(quizQuestionId, {...question, answerIndex}),
          };
    }
  ),
  on(quizActions.correctAnswerCountSet, (state, {correctAnswerCount}) => ({...state, correctAnswerCount}))
);
