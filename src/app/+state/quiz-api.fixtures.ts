import {
  FfAddress,
  FfOrdersTrail,
  FfOrdersTrailDeliveryDetail,
  FfOrdersTrailDestination,
  FfOrdersTrailDestinationContact,
  FfOrdersTrailHeaderStatus,
  FfOrdersTrailOrigin,
  FfOrderTrailStatus,
  FfOrganizationUnit,
} from './quiz-api.models';

export const ffAddressFixture = (
  streetAddress: string = '5818 Flight School Dr',
  city: string = 'Indianapolis',
  state: string = 'IN',
  postalCode: string = '46221',
  countryCode: string = 'US'
): FfAddress => ({ streetAddress, city, state, postalCode, countryCode });

export const ffOrdersTrailOriginFixture = (
  sourceDc: string = '180'
): FfOrdersTrailOrigin => ({ sourceDc });

export const ffOrdersTrailDestinationContactFixture = (
  personName: string = 'Flight School',
  phoneNumber: string = '3125434463',
  email: string = ''
): FfOrdersTrailDestinationContact => ({ personName, phoneNumber, email });

export const ffOrdersTrailDestinationFixture = (
  contact: FfOrdersTrailDestinationContact = ffOrdersTrailDestinationContactFixture(),
  dropoffStoreNumber: string = '5818 Flight School Dr ',
  address: FfAddress = ffAddressFixture()
): FfOrdersTrailDestination => ({ contact, dropoffStoreNumber, address });

export const ffOrdersTrailHeaderStatusFixture = (
  referenceStatus: FfOrderTrailStatus = FfOrderTrailStatus.Requested,
  referenceStatusDate: string = new Date().toISOString(),
  estimatedDeliveryDate: string = new Date().toISOString()
): FfOrdersTrailHeaderStatus => ({
  referenceStatus,
  referenceStatusDate,
  estimatedDeliveryDate,
});

export const ffOrdersTrailDeliveryDetailsFixture = (
  deliveryDetailId: string = ', FLXFWD6830870612654602-1',
  deliveryDetailStatus: FfOrderTrailStatus = FfOrderTrailStatus.Requested,
  deliveryDetailStatusDate: string = new Date().toISOString(),
  estimatedDeliveryDate: string = new Date().toISOString()
): FfOrdersTrailDeliveryDetail => ({
  deliveryDetailId,
  deliveryDetailStatus,
  deliveryDetailStatusDate,
  estimatedDeliveryDate,
});

export const ffOrdersTrailFixture = (
  referenceNumber: string = 'FLXFWD6830870612654602',
  origin: FfOrdersTrailOrigin = ffOrdersTrailOriginFixture(),
  destination: FfOrdersTrailDestination = ffOrdersTrailDestinationFixture(),
  headerStatus: FfOrdersTrailHeaderStatus[] = [
    ffOrdersTrailHeaderStatusFixture(FfOrderTrailStatus.Staged),
    ffOrdersTrailHeaderStatusFixture(FfOrderTrailStatus.OutForDelivery),
    ffOrdersTrailHeaderStatusFixture(FfOrderTrailStatus.Delivered),
  ],
  deliveryDetails: FfOrdersTrailDeliveryDetail[] = [
    ffOrdersTrailDeliveryDetailsFixture(),
    ffOrdersTrailDeliveryDetailsFixture(
      ', FLXFWD6830870612654602-1',
      FfOrderTrailStatus.Staged
    ),
    ffOrdersTrailDeliveryDetailsFixture(
      ', FLXFWD6830870612654602-1',
      FfOrderTrailStatus.OutForDelivery
    ),
    ffOrdersTrailDeliveryDetailsFixture(
      ', FLXFWD6830870612654602-1',
      FfOrderTrailStatus.Delivered
    ),
  ]
): FfOrdersTrail => ({
  referenceNumber,
  origin,
  destination,
  headerStatus,
  deliveryDetails,
});

export const ffOrganizationUnitFixture = (
  orgCode: string = '180',
  townOrCity: string = 'INDIANAPOLIS',
  state: string = 'IN',
  timeZoneValue: string = 'EST'
): FfOrganizationUnit => ({ orgCode, townOrCity, state, timeZoneValue });
