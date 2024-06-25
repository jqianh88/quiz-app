import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, Observable, throwError } from 'rxjs';

import {
  FfAddress,
  FfOrdersTrail,
  FfOrdersTrailDeliveryDetail,
  FfOrdersTrailHeaderStatus,
  FfOrderTrailStatus,
  FfOrganizationUnit,
} from './quiz-api.models';
import {
  FfLocationInfo,
  FfTrackingDetail,
  FfTrackingInfo,
  FfTrackingStatus,
} from './quiz.models';

interface TimeZoneAdjustment {
  standard: string;
  daylightSaving: string;
  dstStartMonth: number;
  dstStartDay: number;
  dstEndMonth: number;
  dstEndDay: number;
}

@Injectable({
  providedIn: 'root',
})
export class FfTrackingApiService {
  private timeZoneAdjustments: { [key: string]: TimeZoneAdjustment } = {
    AST: {
      standard: 'AST',
      daylightSaving: 'ADT',
      dstStartMonth: 2,
      dstStartDay: 8,
      dstEndMonth: 10,
      dstEndDay: 1,
    }, // Atlantic Standard Time
    CST: {
      standard: 'CST',
      daylightSaving: 'CDT',
      dstStartMonth: 2,
      dstStartDay: 8,
      dstEndMonth: 10,
      dstEndDay: 1,
    }, // Central Standard Time
    EST: {
      standard: 'EST',
      daylightSaving: 'EDT',
      dstStartMonth: 2,
      dstStartDay: 8,
      dstEndMonth: 10,
      dstEndDay: 1,
    }, // Eastern Standard Time
    MST: {
      standard: 'MST',
      daylightSaving: 'MDT',
      dstStartMonth: 2,
      dstStartDay: 8,
      dstEndMonth: 10,
      dstEndDay: 1,
    }, // Mountain Standard Time
    NST: {
      standard: 'NST',
      daylightSaving: 'NDT',
      dstStartMonth: 2,
      dstStartDay: 8,
      dstEndMonth: 10,
      dstEndDay: 1,
    }, // Newfoundland Standard Time
    PST: {
      standard: 'PST',
      daylightSaving: 'PDT',
      dstStartMonth: 2,
      dstStartDay: 8,
      dstEndMonth: 10,
      dstEndDay: 1,
    }, // Pacific Standard Time
  };

  private statusToTrackerMap: Record<string, FfTrackingStatus[]> = {
    [FfOrderTrailStatus.Requested]: [FfTrackingStatus.PlacedOrder],
    [FfOrderTrailStatus.Staged]: [
      FfTrackingStatus.Processing,
      FfTrackingStatus.Ready,
      FfTrackingStatus.LoadingTruck,
    ],
    [FfOrderTrailStatus.OutForDelivery]: [
      FfTrackingStatus.Shipped,
      FfTrackingStatus.OutForDelivery,
    ],
    [FfOrderTrailStatus.Delivered]: [FfTrackingStatus.Delivered],
    [FfOrderTrailStatus.DeliveryException]: [
      FfTrackingStatus.DeliveryException,
    ],
  };

  constructor(private httpClient: HttpClient) {}

  public getTrackingInfo(
    referenceNumbers: string[]
  ): Observable<FfTrackingInfo[]> {
    const apiUrl = '/api/shipmentdataaccess/track/orderstrail/';
    const payload = { referenceNumber: referenceNumbers };

    return this.httpClient
      .post<FfOrdersTrail[]>(apiUrl, payload)
      .pipe(
        mergeMap((ots: FfOrdersTrail[]) =>
          !ots.length
            ? throwError(() => 'Tracking number not found')
            : forkJoin(
                ots.map((ot) =>
                  this.getLocationInfo(ot.origin.sourceDc).pipe(
                    map((locationInfo) =>
                      this.convertOrdersTrailToTrackingInfo(ot, locationInfo)
                    )
                  )
                )
              )
        )
      );
  }

  private convertOrdersTrailToTrackingInfo = (
    ordersTrail: FfOrdersTrail,
    locationInfo: FfLocationInfo
  ): FfTrackingInfo => {
    const trackingDetails = ordersTrail.deliveryDetails
      .flatMap((dd) =>
        this.convertDeliveryDetailsToTrackingDetail(
          dd,
          locationInfo,
          ordersTrail.destination.address
        )
      )
      .sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime());

    const orderDate = ordersTrail.headerStatus.length
      ? new Date(ordersTrail.headerStatus?.[0]?.referenceStatusDate)
      : new Date();

    const deliveryEstimate = ordersTrail.headerStatus.length
      ? new Date(
          ordersTrail.headerStatus?.[
            ordersTrail.headerStatus.length - 1
          ].estimatedDeliveryDate
        )
      : null;

    const latestDeliveryStatus = this.getLatestDeliveryStatus(
      ordersTrail.headerStatus
    );
    const trackerFinalDeliveryDate = trackingDetails.length
      ? new Date(trackingDetails[trackingDetails.length - 1].eventDate)
      : null;

    return {
      trackingHeader: {
        trackingNumber: ordersTrail.referenceNumber,
        orderDate,
        deliveryEstimate,
        latestDeliveryStatus,
        timeZoneCode: locationInfo.timeZoneValue,
        trackerFinalDeliveryDate,
      },
      trackingDetails,
    };
  };

  private getLatestDeliveryStatus = (
    headerStatus: FfOrdersTrailHeaderStatus[]
  ): FfTrackingStatus =>
    this.getLatestTrackerStatusForTrailStatus(
      headerStatus.length
        ? headerStatus.reduce((prev, current) =>
            new Date(current.referenceStatusDate) >
            new Date(prev.referenceStatusDate)
              ? current
              : prev
          ).referenceStatus
        : FfOrderTrailStatus.Requested
    );

  private getLatestTrackerStatusForTrailStatus = (
    orderTrailStatus: FfOrderTrailStatus
  ): FfTrackingStatus =>
    this.statusToTrackerMap?.[orderTrailStatus].length
      ? this.statusToTrackerMap?.[orderTrailStatus][
          this.statusToTrackerMap?.[orderTrailStatus].length - 1
        ]
      : FfTrackingStatus.PlacedOrder;

  private adjustTimeZone(timeZoneCode: string): string {
    const adjustment = this.timeZoneAdjustments[timeZoneCode];
    if (adjustment) {
      const today = new Date();
      const dstStart = new Date(
        today.getFullYear(),
        adjustment.dstStartMonth,
        adjustment.dstStartDay
      );
      const dstEnd = new Date(
        today.getFullYear(),
        adjustment.dstEndMonth,
        adjustment.dstEndDay
      );
      const isDST = today >= dstStart && today < dstEnd;
      return isDST ? adjustment.daylightSaving : adjustment.standard;
    } else {
      return timeZoneCode;
    }
  }

  private convertDeliveryDetailsToTrackingDetail = (
    deliveryDetail: FfOrdersTrailDeliveryDetail,
    location: FfLocationInfo,
    destination: FfAddress
  ): FfTrackingDetail[] =>
    (
      this.statusToTrackerMap?.[deliveryDetail.deliveryDetailStatus] || [
        deliveryDetail.deliveryDetailStatus,
      ]
    ).map(
      (status): FfTrackingDetail => ({
        eventDate: new Date(deliveryDetail.deliveryDetailStatusDate),
        status,
        location,
        destination,
      })
    );

  private getLocationInfo(orgCode: string): Observable<FfLocationInfo> {
    const apiUrl = `/api/shipmentdataaccess/getcityandstatebyorgcode/${orgCode}`;
    return this.httpClient.get<FfOrganizationUnit>(apiUrl).pipe(
      map(
        (ou) =>
          ({
            ...ou,
            timeZoneValue: this.adjustTimeZone(ou.timeZoneValue),
          } as FfLocationInfo)
      )
    );
  }
}
