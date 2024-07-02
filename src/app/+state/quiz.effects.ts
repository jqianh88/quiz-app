import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {mergeMap} from 'rxjs';

import {QuizApiService} from './quiz-api.service';
import {abcSet, defSet, setAbc} from './quiz.actions';

@Injectable()
export class QuizEffects {
  constructor(
    private actions$: Actions,
    private quizApiService: QuizApiService
  ) {}

  private setAbc$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setAbc),
      mergeMap(({ abc }) => [abcSet({ abc }), defSet({ def: 'my override' })])
    )
  );
}
