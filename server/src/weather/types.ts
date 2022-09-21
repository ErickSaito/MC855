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
