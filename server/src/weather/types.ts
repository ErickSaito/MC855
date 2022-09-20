export interface GetWeatherDTO {
  latitude: number;
  longitude: number;
}

export interface Weather {
  uvi: number;
  temp: number;
  feels_like: number;
  humidity: number;
  is_raining: boolean;
}
