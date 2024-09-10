import {createFeatureSelector, createSelector} from '@ngrx/store';

import {Option, QuizQuestion} from './quiz.models';
import {QUIZ_FEATURE_KEY, QuizState} from './quiz.reducer';

const selectQuizState = createFeatureSelector<QuizState>(QUIZ_FEATURE_KEY);

export const getName = createSelector(selectQuizState, (state): string => state.name || '');

export const getQuizQuestions = createSelector(selectQuizState, state => state.quizQuestions);

export const getIsQuizActive = createSelector(selectQuizState, state => state.isQuizActive);

export const getCurrentQuestionNumber = createSelector(selectQuizState, (state): number => state.selectedQuizQuestionId || 1);

const getPointsPerCorrectAnswer = createSelector(selectQuizState, state => state.pointsPerCorrectAnswer);

export const getTotalQuestions = createSelector(getQuizQuestions, quizQuestions => quizQuestions.size);

export const getCorrectAnswerCount = createSelector(selectQuizState, state => state.correctAnswerCount);
export const getIncorrectAnswerCount = createSelector(
  getCorrectAnswerCount,
  getTotalQuestions,
  (correctAnswerCount, totalQuestions) => totalQuestions - correctAnswerCount
);

export const getPoints = createSelector(
  getCorrectAnswerCount,
  getPointsPerCorrectAnswer,
  (correctAnswerCount, pointsPerCorrectAnswer) => correctAnswerCount * pointsPerCorrectAnswer
);

export const getProgress = createSelector(selectQuizState, state => 0);

export const getCurrentQuestion = createSelector(
  getQuizQuestions,
  getCurrentQuestionNumber,
  (quizQuestions, currentQuestionNumber): QuizQuestion | undefined => quizQuestions.get(currentQuestionNumber)
);

const getCurrentOptionIndex = createSelector(
  getCurrentQuestion,
  (currentQuestion): number | undefined => currentQuestion?.answerIndex ?? undefined
);

export const getCurrentOption = createSelector(
  getCurrentQuestion,
  getCurrentOptionIndex,
  (currentQuestion, currentOptionIndex): Option | null => {
    console.log(currentQuestion, currentOptionIndex);
    return !!currentQuestion && currentOptionIndex !== undefined ? currentQuestion.options[currentOptionIndex] : null;
  }
);

export const getIsCurrentQuestionAnswered = createSelector(
  getCurrentOptionIndex,
  (currentOptionIndex): boolean => currentOptionIndex !== null
);
export const getIsCurrentQuestionCorrect = createSelector(getCurrentOption, (currentOption): boolean => !!currentOption?.correct);

const getIsFinalMode = createSelector(selectQuizState, state => state.isFinalMode);

export const getShouldAllowPreviousQuestion = createSelector(
  getIsFinalMode,
  getCurrentQuestionNumber,
  (isFinalMode, currentQuestionNumber) => !isFinalMode && !(currentQuestionNumber === 0)
);

// export const getAbc = createSelector(
//   selectQuizState,
//   (state): string => state.abc
// );

// We need to be able to tell the app that we have n questions loaded.

// public totalQuestions$: Observable<number> = this.questionList$.pipe(
//   takeUntilDestroyed(this.destroyRef),
//   map((questions) => questions.length)
// );

// We need to be able to get the current question

// private setCurrentQuestion(index: number): void {
//   const questionList = this.questionListSubject.getValue();
//   if (index >= 0 && index <= questionList.length) {
//     this.currentAnswer$.next(null);
//     this.isCurrentQuestionCorrect$.next(false);
//     this.isCurrentQuestionAnswered$.next(false);
//     this.currentQuestionNumber$.next(index);
//     this.isFirstQuestion$.next(index === 0);
//   }
// }

// We will use derived state to tell us when we have completed the quiz.

// public isQuizCompleted$: Observable<boolean> = combineLatest([
//   this.questionList$,
//   this.currentQuestionNumber$,
// ]).pipe(
//   takeUntilDestroyed(this.destroyRef),
//   map(
//     ([questionList, currentQuestionNumber]) =>
//       currentQuestionNumber >= questionList.length
//   )
// );

// We Need to show the user what question Number we are on.

// public currentQuestionNumber$ = new BehaviorSubject<number>(1);

// We need to be able to show progress indicator

// public progress$: Observable<number> = combineLatest([
//   this.currentQuestionNumber$,
//   this.totalQuestions$,
// ]).pipe(
//   map(([currentQuestionNumber, totalQuestions]) =>
//     totalQuestions === 0 ? 0 : (currentQuestionNumber / totalQuestions) * 100
//   )
// );

// public points$ = new BehaviorSubject<number>(0);
// public questionsAttempted$ = new BehaviorSubject<number>(0);
// public questionsIncorrectlyAnswered$ = new BehaviorSubject<number>(0);
// public isCurrentQuestionAnswered$ = new BehaviorSubject<boolean>(false);
// public isCurrentQuestionCorrect$ = new BehaviorSubject<boolean>(false);
// public isFirstQuestion$ = new BehaviorSubject<boolean>(true);
