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
    return {
      uvi: currWeather.current.uvi,
    };
  }
}
