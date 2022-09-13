export interface IOpenWeatherReq {
  latitude: number;
  longitude: number;
  exclude?: ExcludeWeatherData[];
}

export type ExcludeWeatherData =
  | 'current'
  | 'minutely'
  | 'hourly'
  | 'daily'
  | 'alerts';

// Get more infos about Open Weather response https://openweathermap.org/api/one-call-api
export interface OpenWeatherResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Weather[];
    rain: {
      '1h': number;
    };
    snow: {
      '1h': number;
    };
  };
  minutely: {
    dt: number;
    precipitation: number;
  }[];
  hourly: {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Weather[];
    pop: number;
    rain: {
      '1h': number;
    };
    snow: {
      '1h': number;
    };
  }[];
  daily: {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    monn_phase: number;
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
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    weather: Weather[];
    clouds: number;
    pop: number;
    rain: number;
    snow: number;
    uvi: number;
  }[];
  alerts: {
    sender_name: string;
    event: string;
    start: number;
    end: number;
    description: string;
    tags: string[];
  }[];
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}
