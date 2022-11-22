export interface GetWeatherDTO {
  latitude: number;
  longitude: number;
}

export interface Weather {
  type: 'rain' | 'cold' | 'uv';
  is_happening: boolean;
  intensity: Intensity;
  message: string;
}

export type Intensity = 'normal' | 'low' | 'high' | 'intense' | 'none';
