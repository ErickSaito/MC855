import { IsNotEmpty, IsOptional } from 'class-validator';

export interface Location {
  latitude: number;
  longitude: number;
}

export class SyncDeviceDTO {
  @IsNotEmpty()
  token: string;
  @IsNotEmpty()
  location: Location;
  @IsOptional()
  time?: string; // ISO 8601 format
}
