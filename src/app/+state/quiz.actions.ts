import { createAction, props } from '@ngrx/store';

import { FfTrackingHeader, FfTrackingInfo } from './quiz.models';

export const setTrackingNumbers = createAction(
  '[Tracking] Set Tracking Numbers',
  props<{ trackingNumbers: string }>()
);
export const trackingNumbersSet = createAction(
  '[Tracking] Tracking Numbers Set',
  props<{ trackingNumbers: string }>()
);

export const loadTrackingInfo = createAction(
  '[Tracking] Load Tracking Info',
  props<{ trackingNumbers: string[] }>()
);
export const loadTrackingInfoSuccess = createAction(
  '[Tracking] Load Tracking Info Success',
  props<{ trackingInfos: FfTrackingInfo[] }>()
);
export const loadTrackingInfoFailure = createAction(
  '[Tracking] Load Tracking Info Failure',
  props<{ error: string }>()
);

export const setIsLoading = createAction(
  '[Tracking] Set Is Loading',
  props<{ isLoading: boolean }>()
);
export const isLoadingSet = createAction(
  '[Tracking] Is Loading Set',
  props<{ isLoading: boolean }>()
);

export const clearError = createAction('[Tracking] Clear Error');

export const selectTrackingInfoHeader = createAction(
  '[Tracking] Select Tracking Info Header',
  props<{ trackingHeader: FfTrackingHeader | null }>()
);
export const selectedTrackingNumberSet = createAction(
  '[Tracking] Selected Tracking Number Set',
  props<{ selectedTrackingNumber: string | null }>()
);
