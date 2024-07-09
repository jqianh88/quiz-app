import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

import { QuizApiService } from './quiz-api.service';

@Injectable()
export class QuizEffects {
  constructor(
    private actions$: Actions,
    private quizApiService: QuizApiService
  ) {}

  // private setAbc$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(setAbc),
  //     mergeMap(({ abc }) => [abcSet({ abc }), defSet({ def: 'my override' })])
  //   )
  // );
}
