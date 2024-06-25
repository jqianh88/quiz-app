import {
  FfDestinationAddress,
  FfLocationInfo,
  FfTrackingDetail,
  FfTrackingHeader,
  FfTrackingInfo,
  FfTrackingStatus,
} from './quiz.models';

export const ffTrackingInfoFixture = (
  trackingHeader: FfTrackingHeader = ffTrackingHeaderFixture(),
  trackingDetails: FfTrackingDetail[] = [ffTrackingDetailFixture()]
): FfTrackingInfo => ({
  trackingHeader,
  trackingDetails,
});

export const ffTrackingHeaderFixture = (
  trackingNumber: string = 'FLXFWD1234567890123456',
  orderDate: Date = new Date(),
  deliveryEstimate: Date | null = new Date(),
  latestDeliveryStatus: FfTrackingStatus = FfTrackingStatus.PlacedOrder,
  timeZoneCode: string = 'EST',
  trackerFinalDeliveryDate: Date | null = new Date()
): FfTrackingHeader => ({
  trackingNumber,
  orderDate,
  deliveryEstimate,
  latestDeliveryStatus,
  timeZoneCode,
  trackerFinalDeliveryDate,
});

export const ffTrackingDetailFixture = (
  eventDate: Date = new Date(),
  status: FfTrackingStatus = FfTrackingStatus.PlacedOrder,
  location: FfLocationInfo = ffLocationInfoFixture(),
  destination: FfDestinationAddress = ffDestinationAddressFixture()
): FfTrackingDetail => ({ eventDate, status, location, destination });

export const ffDestinationAddressFixture = (
  streetAddress: string = '5818 Flight School Dr',
  city: string = 'Indianapolis',
  state: string = 'IN',
  postalCode: string = '46221',
  countryCode: string = 'US'
): FfDestinationAddress => ({
  streetAddress,
  city,
  state,
  postalCode,
  countryCode,
});

export const ffLocationInfoFixture = (
  orgCode: string = '180',
  townOrCity: string = 'INDIANAPOLIS',
  state: string = 'IN',
  timeZoneValue: string = 'EST'
): FfLocationInfo => ({ orgCode, townOrCity, state, timeZoneValue });
