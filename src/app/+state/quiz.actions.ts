import {createAction, props} from '@ngrx/store';

import {Option, QuizQuestion} from './quiz.models';
import {QuizState} from './quiz.reducer';

export const initQuiz = createAction('[Quiz] initQuiz');

export const setName = createAction('[Quiz] setName', props<{name: string}>());
export const nameSet = createAction('[Quiz] nameSet', props<{name: string}>());

// private loadQuestions() {
//   this.questionApiService
//     .getQuestionJson()
//     .pipe(takeUntilDestroyed(this.destroyRef))
//     .subscribe((questions) => {
//       this.questionListSubject.next(questions);
//       this.setCurrentQuestion(1); // Set to first question
//     });
// }

export const loadQuestions = createAction('[Quiz] loadQuestions');
export const questionsLoaded = createAction('[Quiz] questionsLoaded', props<{quizQuestions: QuizState['quizQuestions']}>());

// public startQuiz(): void {
//   this.loadQuestions();
//   this.setCurrentQuestion(0);
//   this.isCurrentQuestionAnswered$.next(false);
//   this.questionsCorrectlyAnswered$.next(0);
//   this.questionsIncorrectlyAnswered$.next(0);
//   this.isQuizActive$.next(true);
// }

export const startQuiz = createAction('[Quiz] startQuiz');
export const quizStarted = createAction('[Quiz] quizStarted');

export const setIsQuizActive = createAction('[Quiz] setIsQuizActive', props<{isQuizActive: boolean}>());
export const isQuizActiveSet = createAction('[Quiz] isQuizActiveSet', props<{isQuizActive: boolean}>());

// public resetQuiz(): void {
//   console.log('are we working?');
//   this.startQuiz();
// }

export const resetQuiz = createAction('[Quiz] resetQuiz');
export const quizReset = createAction('[Quiz] quizReset');

// public previousQuestion(): void {
//   const currentIndex = this.currentQuestionNumber$.getValue();
//   if (currentIndex > 0) {
//     this.setCurrentQuestion(currentIndex - 1);
//   }
// }

export const navigateToPreviousQuestion = createAction('[Quiz] navigateToPreviousQuestion');

// public nextQuestion(): void {
//   const currentIndex = this.currentQuestionNumber$.getValue();
//   const questionList = this.questionListSubject.getValue();
//   this.questionsAttempted$.next(this.questionsAttempted$.getValue() + 1);
//   if (!this.isCurrentQuestionAnswered$.getValue()) {
//     this.questionsIncorrectlyAnswered$.next(
//       this.questionsIncorrectlyAnswered$.getValue() + 1
//     );
//   }

//   if (
//     currentIndex >= questionList.length &&
//     this.isCurrentQuestionAnswered$
//   ) {
//     this.router.navigate(['/quiz-results']);
//   } else if (currentIndex < questionList.length) {
//     this.setCurrentQuestion(currentIndex + 1);
//   }
// }

export const navigateToNextQuestion = createAction('[Quiz] navigateToNextQuestion');

export const selectedQuizQuestionIdSet = createAction(
  '[Quiz] selectedQuizQuestionIdSet',
  props<{selectedQuizQuestionId: QuizState['selectedQuizQuestionId']}>()
);

// public answer(option: Option): void {
//   this.currentAnswer$.next(option);
//   this.isCurrentQuestionAnswered$.next(true);
//   this.isCurrentQuestionCorrect$.next(!!option.correct);
//   if (option.correct) {
//     this.points$.next(this.points$.value + 1);
//     this.questionsCorrectlyAnswered$.next(
//       this.questionsCorrectlyAnswered$.getValue() + 1
//     );
//   } else {
//     this.questionsIncorrectlyAnswered$.next(
//       this.questionsIncorrectlyAnswered$.getValue() + 1
//     );
//   }
// }

export const answerCurrentQuestion = createAction('[Quiz] answerCurrentQuestion', props<{option: Option}>());

export const currentOptionIndexSet = createAction(
  '[Quiz] currentOptionIndexSet',
  props<{quizQuestionId: QuizQuestion['id']; answerIndex?: number}>()
);
export const correctAnswerCountSet = createAction('[Quiz] correctAnswerCountSet', props<{correctAnswerCount: number}>());

export const showResults = createAction('[Quiz] showResults');
