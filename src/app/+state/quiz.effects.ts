import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {concatLatestFrom} from '@ngrx/operators';
import {Action, select, Store} from '@ngrx/store';
import {filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs';

import {QuizApiService} from './quiz-api.service';
import * as quizActions from './quiz.actions';
import {QuizQuestion} from './quiz.models';
import {
  getCorrectAnswerCount,
  getCurrentQuestion,
  getCurrentQuestionNumber,
  getIsCurrentQuestionCorrect,
  getTotalQuestions,
} from './quiz.selectors';

@Injectable()
export class QuizEffects implements OnInitEffects {
  private store: Store = inject(Store);
  private actions$: Actions = inject(Actions);
  private quizApiService: QuizApiService = inject(QuizApiService);
  private router: Router = inject(Router);

  public ngrxOnInitEffects = (): Action => quizActions.initQuiz();

  private initQuiz$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quizActions.initQuiz),
      mergeMap(_ => [quizActions.loadQuestions()])
    )
  );

  private loadQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quizActions.loadQuestions),
      switchMap(_ =>
        this.quizApiService.getQuestionJson().pipe(
          map(quizQuestions => new Map<number, QuizQuestion>(quizQuestions.map((qq: QuizQuestion) => [qq.id, qq]))),
          map(quizQuestions => quizActions.questionsLoaded({quizQuestions}))
        )
      )
    )
  );

  private setName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quizActions.setName),
      map(({name}) => quizActions.nameSet({name}))
    )
  );

  private nameSet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quizActions.nameSet),
      tap(_ => this.router.navigate(['/quiz-questions'])),
      map(_ => quizActions.setIsQuizActive({isQuizActive: true}))
    )
  );

  private setIsQuizActive$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quizActions.setIsQuizActive),
      map(({isQuizActive}) => quizActions.isQuizActiveSet({isQuizActive}))
    )
  );

  private answerCurrentQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quizActions.answerCurrentQuestion),
      withLatestFrom(this.store.pipe(select(getCurrentQuestion))),
      filter(([, currentQuestion]) => currentQuestion !== undefined && currentQuestion.answerIndex === undefined),
      map(([{option}, currentQuestion]) => ({
        quizQuestionId: currentQuestion!.id,
        answerIndex: currentQuestion!.options.findIndex(o => o.text === option.text),
      })),
      map(({quizQuestionId, answerIndex}) => quizActions.currentOptionIndexSet({quizQuestionId, answerIndex}))
    )
  );

  private currentOptionIndexSet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quizActions.currentOptionIndexSet),
      concatLatestFrom(() => [this.store.pipe(select(getIsCurrentQuestionCorrect)), this.store.pipe(select(getCorrectAnswerCount))]),
      filter(([, isCurrentQuestionCorrect]) => isCurrentQuestionCorrect),
      map(([, , correctAnswerCount]) => correctAnswerCount + 1),
      map(correctAnswerCount => quizActions.correctAnswerCountSet({correctAnswerCount}))
    )
  );

  private navigateToPreviousQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quizActions.navigateToPreviousQuestion),
      concatLatestFrom(_ => [this.store.pipe(select(getCurrentQuestionNumber)), this.store.pipe(select(getTotalQuestions))]),
      map(([, currentQuestionNumber, lengthOfQuestions]) => (lengthOfQuestions === 0 ? 1 : Math.max(currentQuestionNumber - 1, 0) + 1)),
      map(selectedQuizQuestionId => quizActions.selectedQuizQuestionIdSet({selectedQuizQuestionId}))
    )
  );

  private navigateToNextQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quizActions.navigateToNextQuestion),
      concatLatestFrom(_ => [this.store.pipe(select(getCurrentQuestionNumber)), this.store.pipe(select(getTotalQuestions))]),
      map(([, currentQuestionNumber, lengthOfQuestions]) => ({
        currentQuestionNumber,
        lengthOfQuestions,
        isQuizDone: currentQuestionNumber + 1 > lengthOfQuestions,
      })),
      map(({currentQuestionNumber, lengthOfQuestions, isQuizDone}) => ({
        selectedQuizQuestionId: lengthOfQuestions === 0 ? 1 : Math.min(lengthOfQuestions - 1, currentQuestionNumber) + 1,
        isQuizDone,
      })),
      map(({selectedQuizQuestionId, isQuizDone}) => {
        return isQuizDone ? quizActions.showResults() : quizActions.selectedQuizQuestionIdSet({selectedQuizQuestionId});
      })
    )
  );

  private showResults$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(quizActions.showResults),
        tap(_ => this.router.navigate(['/quiz-results']))
      ),
    {dispatch: false}
  );
}
