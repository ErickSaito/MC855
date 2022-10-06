export interface GetWeatherDTO {
  latitude: number;
  longitude: number;
  next_hour?: number;
}

export interface Weather {
  current: {
    uvi: number;
    temp: number;
    feels_like: number;
    humidity: number;
    rain: boolean;
    rain_intensity: RainIntesity;
  };
  eve: {
    temp: number;
    feels_like: number;
    humidity: number;
    rain: boolean;
    rain_intensity?: RainIntesity;
    message?: string;
  };
  night: {
    temp: number;
    feels_like: number;
    humidity: number;
    rain: boolean;
    rain_intensity?: RainIntesity;
    message: string;
  };
  tomorrow: {
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    };
    feels_like: {
      day: number;
      night: number;
      eve: number;
      morn: number;
    };
    humidity: number;
    rain: boolean;
    uvi: number;
    rain_intensity?: RainIntesity;
    message?: string;
  };
}

export type RainIntesity = 'normal' | 'low' | 'high' | 'intense' | 'none';
