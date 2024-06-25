import { createReducer, on } from '@ngrx/store';

import * as FfTrackingActions from './quiz.actions';
import { FfTrackingInfo } from './quiz.models';

export interface FfState {
  trackingNumbers: string;
  selectedTrackingNumber: string | null;
  trackingInfos: FfTrackingInfo[];
  error: string;
  isLoading: boolean;
}

export const initialState: FfState = {
  trackingNumbers: '',
  selectedTrackingNumber: null,
  trackingInfos: [],
  error: '',
  isLoading: false,
};

export const trackingReducer = createReducer(
  initialState,
  on(FfTrackingActions.trackingNumbersSet, (state, { trackingNumbers }) => ({
    ...state,
    trackingNumbers,
  })),
  on(FfTrackingActions.loadTrackingInfoSuccess, (state, { trackingInfos }) => ({
    ...state,
    trackingInfos,
    error: '',
    isLoading: false,
  })),
  on(FfTrackingActions.loadTrackingInfoFailure, (state, { error }) => ({
    ...state,
    trackingInfos: [],
    error,
    isLoading: false,
  })),
  on(
    FfTrackingActions.selectedTrackingNumberSet,
    (state, { selectedTrackingNumber }) => ({
      ...state,
      selectedTrackingNumber,
    })
  ),
  on(FfTrackingActions.clearError, (state) => ({ ...state, error: '' })),
  on(FfTrackingActions.isLoadingSet, (state, { isLoading }) => ({
    ...state,
    isLoading,
  }))
);
