import { IsNotEmpty } from 'class-validator';

export interface Location {
  latitude: number;
  longitude: number;
}

export class SyncDeviceDTO {
  @IsNotEmpty()
  token: string;
  @IsNotEmpty()
  location: Location;

  time?: string; // ISO 8601 format
}
