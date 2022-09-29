export interface GetWeatherDTO {
  latitude: number;
  longitude: number;
  next_hour?: number;
}

export interface Weather {
  uvi: number;
  temp: number;
  feels_like: number;
  humidity: number;
  rain: boolean;
}

export interface DayWeather {
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
  uvi: number;
  rain: boolean;
}
