import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { FfTrackingApiService } from './quiz-api.service';
import * as FfTrackingActions from './quiz.actions';
import { TrackingEffects } from './quiz.effects';
import {
  ffTrackingHeaderFixture,
  ffTrackingInfoFixture,
} from './quiz.fixtures';

describe('TrackingEffects', () => {
  let testScheduler: TestScheduler;
  let actions$: Observable<Action>;
  let store: MockStore;
  let effects: TrackingEffects;
  let ffTrackingApiService: FfTrackingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TrackingEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: FfTrackingApiService, useValue: jest.fn() },
      ],
    });

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    store = TestBed.inject(MockStore);
    effects = TestBed.inject(TrackingEffects);
    ffTrackingApiService = TestBed.inject(FfTrackingApiService);
  });

  describe('navigateToSearch$', () => {
    it('should send setTrackingNumbers when navigated to /search', () => {
      const trackingNumbers = 'FLXFWD1234567890123456,FLXFWD0987654321098765';
      const url = `/search?trackingNumbers=${trackingNumbers}`;

      testScheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('-a-|', {
          a: {
            type: ROUTER_NAVIGATION,
            payload: {
              routerState: { url, root: { queryParams: { trackingNumbers } } },
            },
          },
        });

        expectObservable(effects.navigateToSearch$).toBe('-a-|', {
          a: FfTrackingActions.setTrackingNumbers({ trackingNumbers }),
        });
      });
    });

    it('should do nothing when navigated to path other than /search', () => {
      const trackingNumbers = 'FLXFWD1234567890123456,FLXFWD0987654321098765';
      const url = `/find?trackingNumbers=${trackingNumbers}`;

      testScheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('-a-|', {
          a: {
            type: ROUTER_NAVIGATION,
            payload: {
              routerState: { url, root: { queryParams: { trackingNumbers } } },
            },
          },
        });

        expectObservable(effects.setTrackingNumbers$).toBe('---|');
      });
    });
  });

  describe('setTrackingNumbers$', () => {
    it('should send trackingNumbersSet to update state with the data received', () => {
      const trackingNumbers = 'FLXFWD1234567890123456,FLXFWD0987654321098765';

      testScheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('-a-|', {
          a: FfTrackingActions.setTrackingNumbers({ trackingNumbers }),
        });

        expectObservable(effects.setTrackingNumbers$).toBe('-a-|', {
          a: FfTrackingActions.trackingNumbersSet({ trackingNumbers }),
        });
      });
    });
  });

  describe('trackingNumbersSet$', () => {
    it('should send loadTrackingInfo to call the back end with the tracking numbers', () => {
      const trackingNumbers = 'FLXFWD1234567890123456,FLXFWD0987654321098765';
      const parsedTrackingNumbers = [
        'FLXFWD1234567890123456',
        'FLXFWD0987654321098765',
      ];

      testScheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('-a-|', {
          a: FfTrackingActions.trackingNumbersSet({ trackingNumbers }),
        });

        expectObservable(effects.trackingNumbersSet$).toBe('-a-|', {
          a: FfTrackingActions.loadTrackingInfo({
            trackingNumbers: parsedTrackingNumbers,
          }),
        });
      });
    });
  });

  describe('loadTrackingInfo$', () => {
    it('should send loadTrackingInfoSuccess to update state with the data received', () => {
      const trackingNumbers = ['FLXFWD0987654321098765'];
      const trackingInfos = [ffTrackingInfoFixture(), ffTrackingInfoFixture()];

      ffTrackingApiService.getTrackingInfo = jest.fn(() => of(trackingInfos));
      store.dispatch = jest.fn();

      testScheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('-a-|', {
          a: FfTrackingActions.loadTrackingInfo({ trackingNumbers }),
        });

        expectObservable(effects.loadTrackingInfo$).toBe('-a-|', {
          a: FfTrackingActions.loadTrackingInfoSuccess({ trackingInfos }),
        });
      });

      expect(store.dispatch).toHaveBeenCalledWith(
        FfTrackingActions.selectedTrackingNumberSet({
          selectedTrackingNumber: null,
        })
      );
      expect(ffTrackingApiService.getTrackingInfo).toHaveBeenCalledWith(
        trackingNumbers
      );
    });

    it('should fail gracefully, sending loadTrackingInfoSuccess to update state', () => {
      const trackingNumbers = ['FLXFWD0987654321098765'];
      const error = 'OH NOES!';

      ffTrackingApiService.getTrackingInfo = jest.fn(() =>
        throwError(() => error)
      );

      testScheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('-a-|', {
          a: FfTrackingActions.loadTrackingInfo({ trackingNumbers }),
        });

        expectObservable(effects.loadTrackingInfo$).toBe('-a-|', {
          a: FfTrackingActions.loadTrackingInfoFailure({ error }),
        });
      });
      expect(ffTrackingApiService.getTrackingInfo).toHaveBeenCalledWith(
        trackingNumbers
      );
    });
  });

  describe('selectTrackingInfoHeader$', () => {
    it('should send selectedTrackingNumberSet to update state with the data received', () => {
      const trackingHeader = ffTrackingHeaderFixture();
      const selectedTrackingNumber = trackingHeader.trackingNumber;

      testScheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('-a-|', {
          a: FfTrackingActions.selectTrackingInfoHeader({ trackingHeader }),
        });

        expectObservable(effects.selectTrackingInfoHeader$).toBe('-a-|', {
          a: FfTrackingActions.selectedTrackingNumberSet({
            selectedTrackingNumber,
          }),
        });
      });
    });

    it('should send selectedTrackingNumberSet to update state when trackingHeader is null', () => {
      const trackingHeader = null;
      const selectedTrackingNumber = null;

      testScheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('-a-|', {
          a: FfTrackingActions.selectTrackingInfoHeader({ trackingHeader }),
        });

        expectObservable(effects.selectTrackingInfoHeader$).toBe('-a-|', {
          a: FfTrackingActions.selectedTrackingNumberSet({
            selectedTrackingNumber,
          }),
        });
      });
    });
  });
});
