import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';

import {
  ffOrdersTrailFixture,
  ffOrganizationUnitFixture,
} from './quiz-api.fixtures';
import { FfOrdersTrail } from './quiz-api.models';
import { FfTrackingApiService } from './quiz-api.service';

describe('FfTrackingApiService', () => {
  let testScheduler: TestScheduler;
  let service: FfTrackingApiService;

  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FfTrackingApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    service = TestBed.inject(FfTrackingApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Services API', () => {
    describe('getTrackingInfo', () => {
      it('should respond correctly when http succeeds', () => {
        const url = '/api/shipmentdataaccess/track/orderstrail/';
        const referenceNumbers = [
          'FLXFWD1234567890123456',
          'FLXFWD0987654321098765',
        ];
        const mockApiResponse: FfOrdersTrail[] = [
          ffOrdersTrailFixture(),
          ffOrdersTrailFixture('FLXFWD1234567890123456'),
        ];
        // const expected: FfTrackingInfo[] = [ffTrackingInfoFixture(), ffTrackingInfoFixture()];
        testScheduler.run(({ expectObservable, flush, hot }) => {
          expectObservable(
            hot('-a-|', { a: service.getTrackingInfo(referenceNumbers) })
          ).toBe('-a-|', { a: [] });
          flush();
          httpMock.expectOne({ url, method: 'POST' }).flush(mockApiResponse);
          httpMock
            .match('/api/shipmentdataaccess/getcityandstatebyorgcode/180')
            .forEach((m) => m.flush(ffOrganizationUnitFixture()));
        });
      });

      // it('should respond correctly when http succeeds with empty payload', () => {
      //   const url = '/api/shipmentdataaccess/track/orderstrail/';
      //   const referenceNumbers = ['FLXFWD0987654321098765'];
      //   const mockApiResponse: FfOrdersTrail[] = [];

      //   // jest.spyOn(httpClient, 'get').mockReturnValue(of(mockApiResponse));

      //   testScheduler.run(({expectObservable}) => {
      //     expectObservable(service.getTrackingInfo(referenceNumbers)).toBe('(a|)', {a: mockApiResponse});
      //   });

      //   expect(httpClient.get).toHaveBeenCalledWith(url, {referenceNumber: referenceNumbers});
      // });

      // it('should respond correctly when no tracking numbers are sent', () => {
      //   const url = '/api/shipmentdataaccess/track/orderstrail/';
      //   const referenceNumbers: string[] = [];
      //   const mockApiResponse: FfOrdersTrail[] = [];

      //   // jest.spyOn(httpClient, 'get').mockReturnValue(of(mockApiResponse));

      //   testScheduler.run(({expectObservable}) => {
      //     expectObservable(service.getTrackingInfo(referenceNumbers)).toBe('(a|)', {a: mockApiResponse});
      //   });

      //   expect(httpClient.get).toHaveBeenCalledWith(url, {referenceNumber: referenceNumbers});
      // });

      // it('should respond correctly when http fails', () => {
      //   const url = '/api/shipmentdataaccess/track/orderstrail/';
      //   const referenceNumbers = ['FLXFWD1234567890123456', 'FLXFWD0987654321098765'];
      //   const errorMsg = 'test 404 error';

      //   service.getTrackingInfo(referenceNumbers).subscribe(
      //     _ => fail('should have failed with 404 error'),
      //     (resp: HttpErrorResponse) => {
      //       expect(resp instanceof HttpErrorResponse).toBe(true);
      //       expect(resp.status).toEqual(404);
      //       expect(resp.error).toEqual(errorMsg);
      //     }
      //   );

      //   const req = httpMock.expectOne(url);
      //   req.flush(errorMsg, {status: 404, statusText: 'Not Found'});
      // });
    });
  });
});
