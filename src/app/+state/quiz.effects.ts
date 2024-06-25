import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';

import { FfTrackingApiService } from './quiz-api.service';
import * as FfTrackingActions from './quiz.actions';

@Injectable()
export class TrackingEffects {
  constructor(
    private actions$: Actions,
    private ffTrackingApiService: FfTrackingApiService,
    private store: Store
  ) {}

  navigateToSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter(({ payload }: RouterNavigationAction) =>
        payload.routerState.url.startsWith('/search')
      ),
      map(
        ({ payload }) =>
          payload.routerState.root.queryParams?.['trackingNumbers']
      ),
      filter((trackingNumbers) => !!trackingNumbers),
      map((trackingNumbers) =>
        FfTrackingActions.setTrackingNumbers({ trackingNumbers })
      )
    )
  );

  setTrackingNumbers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FfTrackingActions.setTrackingNumbers),
      map(({ trackingNumbers }) =>
        FfTrackingActions.trackingNumbersSet({ trackingNumbers })
      )
    )
  );

  trackingNumbersSet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FfTrackingActions.trackingNumbersSet),
      map(({ trackingNumbers }) => [
        ...new Set(
          trackingNumbers
            .replace(/[\W]+/, ',')
            .split(',')
            .filter((s) => s.length)
        ),
      ]),
      map((trackingNumbers) =>
        FfTrackingActions.loadTrackingInfo({ trackingNumbers })
      )
    )
  );

  loadTrackingInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FfTrackingActions.loadTrackingInfo),
      tap((_) =>
        this.store.dispatch(FfTrackingActions.setIsLoading({ isLoading: true }))
      ),
      tap((_) =>
        this.store.dispatch(
          FfTrackingActions.selectedTrackingNumberSet({
            selectedTrackingNumber: null,
          })
        )
      ),
      switchMap(({ trackingNumbers }) =>
        this.ffTrackingApiService.getTrackingInfo(trackingNumbers).pipe(
          map((trackingInfos) =>
            FfTrackingActions.loadTrackingInfoSuccess({ trackingInfos })
          ),
          catchError((error) =>
            of(FfTrackingActions.loadTrackingInfoFailure({ error }))
          )
        )
      )
    )
  );

  setIsLoadingTrackingInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FfTrackingActions.setIsLoading),
      map(({ isLoading }) => FfTrackingActions.isLoadingSet({ isLoading }))
    )
  );

  selectTrackingInfoHeader$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FfTrackingActions.selectTrackingInfoHeader),
      map(({ trackingHeader }) =>
        FfTrackingActions.selectedTrackingNumberSet({
          selectedTrackingNumber: trackingHeader?.trackingNumber || null,
        })
      )
    )
  );
}
