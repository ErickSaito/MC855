import { Injectable } from '@nestjs/common';
import { OpenWeatherAPI } from '../open-weather/api';
import { GetWeatherDTO } from './types';

@Injectable()
export class WeatherService {
  constructor(private openWeatherAPI: OpenWeatherAPI) {}

  async getCurrent(req: GetWeatherDTO) {
    const currWeather = await this.openWeatherAPI.getWeather({
      latitude: req.latitute,
      longitude: req.longitude,
      exclude: ['minutely', 'hourly', 'daily', 'alerts'],
    });
    return currWeather;
  }
}
