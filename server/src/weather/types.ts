export interface GetWeatherDTO {
  latitude: number;
  longitude: number;
}

export interface Weather {
  rain: boolean;
  rain_intensity?: RainIntesity;
  message?: string;
}

export type RainIntesity = 'normal' | 'low' | 'high' | 'intense' | 'none';
