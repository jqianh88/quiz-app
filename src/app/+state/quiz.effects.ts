import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {concatLatestFrom} from '@ngrx/operators';
import {Action, select, Store} from '@ngrx/store';
import {filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs';

import {QuizApiService} from './quiz-api.service';
import * as quizActions from './quiz.actions';
import {answerCurrentQuestion, currentOptionIndexSet} from './quiz.actions';
import {QuizQuestion} from './quiz.models';
import {getCurrentQuestion, getCurrentQuestionNumber, getTotalQuestions} from './quiz.selectors';

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
      ofType(answerCurrentQuestion),
      withLatestFrom(this.store.pipe(select(getCurrentQuestion))),
      filter(([, currentQuestion]) => currentQuestion !== undefined && currentQuestion.answerIndex === undefined),
      map(([{option}, currentQuestion]) => ({
        quizQuestionId: currentQuestion!.id,
        answerIndex: currentQuestion!.options.findIndex(o => o.text === option.text),
      })),
      map(({quizQuestionId, answerIndex}) => currentOptionIndexSet({quizQuestionId, answerIndex}))
    )
  );

  private navigateToPreviousQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quizActions.navigateToPreviousQuestion),
      concatLatestFrom(_ => [this.store.pipe(select(getCurrentQuestionNumber)), this.store.pipe(select(getTotalQuestions))]),
      map(([, currentIndex, lengthOfQuestions]) => (lengthOfQuestions === 0 ? 1 : Math.max(currentIndex - 1, 0) + 1)),
      map(selectedQuizQuestionId => quizActions.selectedQuizQuestionIdSet({selectedQuizQuestionId}))
    )
  );

  private navigateToNextQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quizActions.navigateToNextQuestion),
      concatLatestFrom(_ => [this.store.pipe(select(getCurrentQuestionNumber)), this.store.pipe(select(getTotalQuestions))]),
      map(([, currentIndex, lengthOfQuestions]) => (lengthOfQuestions === 0 ? 1 : Math.min(lengthOfQuestions - 1, currentIndex + 1) + 1)),
      map(selectedQuizQuestionId => quizActions.selectedQuizQuestionIdSet({selectedQuizQuestionId}))
    )
  );
}
