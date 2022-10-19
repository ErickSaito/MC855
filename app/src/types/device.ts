export interface Location {
  latitude: number;
  longitude: number;
}

export interface SyncDeviceDTO {
  token: string;
  location: Location;
  time?: string; // ISO 8601 format
}
