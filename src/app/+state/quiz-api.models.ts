export enum FfOrderTrailStatus {
  Requested = 'REQUESTED',
  Staged = 'STAGED',
  OutForDelivery = 'OUT FOR DELIVERY',
  Delivered = 'DELIVERED',
  DeliveryException = 'DELIVERY EXCEPTION'
}

export interface FfAddress {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
}

export interface FfOrdersTrailOrigin {
  sourceDc: string;
}

export interface FfOrdersTrailDestinationContact {
  personName: string;
  phoneNumber: string;
  email: string;
}

export interface FfOrdersTrailDestination {
  contact: FfOrdersTrailDestinationContact;
  dropoffStoreNumber: string;
  address: FfAddress;
}

export interface FfOrdersTrailHeaderStatus {
  referenceStatus: FfOrderTrailStatus;
  referenceStatusDate: string;
  estimatedDeliveryDate: string;
}

export interface FfOrdersTrailDeliveryDetail {
  deliveryDetailId: string;
  deliveryDetailStatus: FfOrderTrailStatus;
  deliveryDetailStatusDate: string;
  estimatedDeliveryDate: string;
}

export interface FfOrdersTrail {
  referenceNumber: string;
  origin: FfOrdersTrailOrigin;
  destination: FfOrdersTrailDestination;
  headerStatus: FfOrdersTrailHeaderStatus[];
  deliveryDetails: FfOrdersTrailDeliveryDetail[];
}

export interface FfOrganizationUnit {
  orgCode: string;
  townOrCity: string;
  state: string;
  timeZoneValue: string;
}
