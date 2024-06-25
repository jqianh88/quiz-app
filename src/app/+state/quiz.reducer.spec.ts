import { Action } from '@ngrx/store';

import * as FfTrackingActions from './quiz.actions';
import { ffTrackingInfoFixture } from './quiz.fixtures';
import { FfTrackingInfo } from './quiz.models';
import { FfState, initialState, trackingReducer } from './quiz.reducer';

describe('Tracking Reducer', () => {
  describe('valid Tracking actions', () => {
    it('trackingNumbersSet set the tracking numbers', () => {
      const trackingNumbers = '123,456, 789';
      const action = FfTrackingActions.trackingNumbersSet({ trackingNumbers });

      const result: FfState = trackingReducer(initialState, action);

      expect(result.trackingNumbers).toBe(trackingNumbers);
    });

    it('loadTrackingInfoSuccess should set the data and remove any error', () => {
      const trackingInfos: FfTrackingInfo[] = [ffTrackingInfoFixture()];
      const action = FfTrackingActions.loadTrackingInfoSuccess({
        trackingInfos,
      });

      const result: FfState = trackingReducer(
        { ...initialState, error: 'an error' },
        action
      );

      expect(result.trackingInfos).toBe(trackingInfos);
      expect(result.error).toBe('');
    });

    it('loadTrackingInfoFailure should set an error', () => {
      const error = 'an error';
      const action = FfTrackingActions.loadTrackingInfoFailure({ error });

      const result: FfState = trackingReducer(
        { ...initialState, trackingInfos: [ffTrackingInfoFixture()] },
        action
      );

      expect(result.error).toBe('an error');
      expect(result.trackingInfos).toEqual([]);
    });

    it('selectedTrackingNumberSet should set the selected id', () => {
      const selectedTrackingNumber = '42';
      const action = FfTrackingActions.selectedTrackingNumberSet({
        selectedTrackingNumber,
      });

      const result: FfState = trackingReducer({ ...initialState }, action);

      expect(result.selectedTrackingNumber).toBe(selectedTrackingNumber);
    });

    it('clearError should set the selected id', () => {
      const action = FfTrackingActions.clearError();

      const result: FfState = trackingReducer(
        { ...initialState, error: 'an error' },
        action
      );

      expect(result.error).toBe('');
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = trackingReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
