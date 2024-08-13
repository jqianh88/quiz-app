import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs';

import {QuizApiService} from './quiz-api.service';
import * as quizActions from './quiz.actions';
import {answerCurrentQuestion, currentOptionIndexSet} from './quiz.actions';
import {getCurrentOption, getCurrentQuestion} from './quiz.selectors';

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
      switchMap(_ => this.quizApiService.getQuestionJson().pipe(map(quizQuestions => quizActions.questionsLoaded({quizQuestions}))))
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
      withLatestFrom(this.store.pipe(select(getCurrentQuestion)), this.store.pipe(select(getCurrentOption))),
      filter(([, , currentOption]) => currentOption === null),
      map(([{option}, currentQuestion]) =>
        currentOptionIndexSet({currentOptionIndex: currentQuestion.options.findIndex(o => o === option)})
      )
    )
  );
}
