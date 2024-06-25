import {
  ffTrackingHeaderFixture,
  ffTrackingInfoFixture,
} from './quiz.fixtures';
import { FfTrackingInfo } from './quiz.models';
import { FfState, initialState } from './quiz.reducer';
import * as FfTrackingSelectors from './quiz.selectors';

describe('Tracking Selectors', () => {
  let state: FfState;
  const trackingNumbers: string =
    'FLXFWD1234567890123456, FLXFWD0987654321098765';
  const selectedTrackingNumber: string = 'FLXFWD1234567890123456';
  const trackingInfos: FfTrackingInfo[] = [
    ffTrackingInfoFixture(),
    ffTrackingInfoFixture(ffTrackingHeaderFixture('FLXFWD0987654321098765')),
  ];
  const error: string = 'Oh noes!';

  beforeEach(() => {
    state = {
      ...initialState,
      trackingNumbers,
      selectedTrackingNumber,
      trackingInfos,
      error,
    };
  });

  describe('Tracking Selectors', () => {
    it('getTrackingNumbers should return the tracking numbers string', () => {
      expect(FfTrackingSelectors.getTrackingNumbers.projector(state)).toBe(
        trackingNumbers
      );
    });

    it('getTrackingInfos should return the tracking info records', () => {
      expect(FfTrackingSelectors.getTrackingInfos.projector(state)).toBe(
        trackingInfos
      );
    });

    it('getTrackingHeaders should return the tracking headers', () => {
      expect(
        FfTrackingSelectors.getTrackingHeaders.projector(trackingInfos)
      ).toEqual(trackingInfos.map((ti) => ti.trackingHeader));
    });

    describe('getSelectedTrackingNumber', () => {
      it('getSelectedTrackingNumber should return the selected tracking number', () => {
        expect(
          FfTrackingSelectors.getSelectedTrackingNumber.projector(state)
        ).toEqual(selectedTrackingNumber);
      });

      it('getSelectedTrackingNumber should return null when there is no tracking number', () => {
        expect(
          FfTrackingSelectors.getSelectedTrackingNumber.projector({
            ...state,
            selectedTrackingNumber: null,
          })
        ).toBeNull();
      });
    });

    describe('getSelectedTrackingInfo', () => {
      it('should return the selected tracking info', () => {
        expect(
          FfTrackingSelectors.getSelectedTrackingInfo.projector(
            trackingInfos,
            selectedTrackingNumber
          )
        ).toEqual(trackingInfos[0]);
      });

      it('should return null when there is no selected tracking info', () => {
        expect(
          FfTrackingSelectors.getSelectedTrackingInfo.projector(
            trackingInfos,
            '123'
          )
        ).toBeNull();
      });
    });

    it('getTrackingError should return the current "error" state', () => {
      expect(FfTrackingSelectors.getTrackingError.projector(state)).toBe(error);
    });
  });
});
