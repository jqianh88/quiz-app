// export const setAbc = createAction('[Quiz] Set Abc', props<{ abc: string }>());
import { createAction, props } from '@ngrx/store';

// initQuiz

// load Questions

// private loadQuestions() {
//   this.questionApiService
//     .getQuestionJson()
//     .pipe(takeUntilDestroyed(this.destroyRef))
//     .subscribe((questions) => {
//       this.questionListSubject.next(questions);
//       this.setCurrentQuestion(1); // Set to first question
//     });
// }

// startQuiz

// public startQuiz(): void {
//   this.loadQuestions();
//   this.setCurrentQuestion(0);
//   this.isCurrentQuestionAnswered$.next(false);
//   this.questionsCorrectlyAnswered$.next(0);
//   this.questionsIncorrectlyAnswered$.next(0);
//   this.isQuizActive$.next(true);
// }

// reset Quiz
// public resetQuiz(): void {
//   console.log('are we working?');
//   this.startQuiz();
// }

// previous Question

// public previousQuestion(): void {
//   const currentIndex = this.currentQuestionNumber$.getValue();
//   if (currentIndex > 0) {
//     this.setCurrentQuestion(currentIndex - 1);
//   }
// }

// next Question

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

// Answer Current Question

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

export const setName = createAction(
  '[Quiz] Set Name',
  props<{ name: string }>()
);
export const nameSet = createAction(
  '[Quiz] Name Set',
  props<{ name: string }>()
);
