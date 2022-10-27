export interface GetWeatherDTO {
  latitude: number;
  longitude: number;
}

export interface Weather {
  type: 'rain' | 'cold';
  is_happening: boolean;
  intensity?: Intesity;
  message?: string;
}

export type Intesity = 'normal' | 'low' | 'high' | 'intense' | 'none';
