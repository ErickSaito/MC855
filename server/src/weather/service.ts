import { Injectable } from '@nestjs/common';
import { OpenWeatherAPI } from '../open-weather/api';
import { GetWeatherDTO, Weather } from './types';

@Injectable()
export class WeatherService {
  constructor(private openWeatherAPI: OpenWeatherAPI) {}

  async getCurrent(req: GetWeatherDTO): Promise<Weather> {
    const currWeather = await this.openWeatherAPI.getWeather({
      latitude: req.latitude,
      longitude: req.longitude,
      exclude: ['minutely', 'hourly', 'daily', 'alerts'],
    });

    const { uvi, feels_like, temp, humidity, rain } = currWeather.current;
    return {
      uvi,
      feels_like,
      temp,
      humidity,
      is_raining: !!rain,
    };
  }
}
