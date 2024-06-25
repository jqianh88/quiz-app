import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FfTrackingHeader, FfTrackingInfo } from './quiz.models';
import { FfState } from './quiz.reducer';

const selectTrackingState = createFeatureSelector<FfState>('tracking');

export const getTrackingNumbers = createSelector(
  selectTrackingState,
  (state): string => state.trackingNumbers
);

export const getTrackingInfos = createSelector(
  selectTrackingState,
  (state): FfTrackingInfo[] => state.trackingInfos
);

export const getTrackingHeaders = createSelector(
  getTrackingInfos,
  (trackingInfos): FfTrackingHeader[] =>
    trackingInfos.map((ti) => ti.trackingHeader)
);

export const getSelectedTrackingNumber = createSelector(
  selectTrackingState,
  (state): string | null => state.selectedTrackingNumber
);

export const getSelectedTrackingInfo = createSelector(
  getTrackingInfos,
  getSelectedTrackingNumber,
  (trackingInfos, selectedTrackingNumber): FfTrackingInfo | null =>
    (selectedTrackingNumber !== null &&
      trackingInfos.find(
        (ti) => ti.trackingHeader.trackingNumber === selectedTrackingNumber
      )) ||
    null
);

export const getTrackingError = createSelector(
  selectTrackingState,
  (state) => state.error
);

export const getIsLoading = createSelector(
  selectTrackingState,
  (state) => state.isLoading
);
