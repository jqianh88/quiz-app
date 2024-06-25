export enum FfTrackingStatus {
  PlacedOrder = 'Placed Order',
  Processing = 'Processing',
  Ready = 'Ready',
  LoadingTruck = 'Loading Truck',
  Shipped = 'Shipped',
  OutForDelivery = 'Out For Delivery',
  Delivered = 'Delivered',
  DeliveryException = 'Delivery Exception',
}

export interface FfTrackingInfo {
  trackingHeader: FfTrackingHeader;
  trackingDetails: FfTrackingDetail[];
}

export interface FfTrackingHeader {
  trackingNumber: string;
  orderDate: Date;
  deliveryEstimate: Date | null;
  latestDeliveryStatus: FfTrackingStatus;
  timeZoneCode: string;
  trackerFinalDeliveryDate: Date | null;
}

export interface FfTrackingDetail {
  eventDate: Date;
  status: FfTrackingStatus;
  location: FfLocationInfo;
  destination: FfDestinationAddress;
}

export interface FfDestinationAddress {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
}

export interface FfLocationInfo {
  orgCode: string;
  townOrCity: string;
  state: string;
  timeZoneValue: string;
}
