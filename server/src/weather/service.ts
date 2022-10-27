import { Injectable } from '@nestjs/common';
import { WeatherMessageService } from '../message/service';
import { OpenWeatherAPI } from '../open-weather/api';
import { GetWeatherDTO, Intesity, Weather } from './types';

@Injectable()
export class WeatherService {
  constructor(
    private openWeatherAPI: OpenWeatherAPI,
    private messageService: WeatherMessageService,
  ) {}

  getRainIntensity(rain: number): Intesity {
    if (!rain) {
      return 'none';
    }

    if (rain <= 5) {
      return 'low';
    }

    if (rain < 25) {
      return 'normal';
    }

    if (rain < 50) {
      return 'high';
    }

    return 'intense';
  }

  async getWeather(req: GetWeatherDTO): Promise<Weather> {
    const weather = await this.openWeatherAPI.getWeather({
      latitude: req.latitude,
      longitude: req.longitude,
      exclude: ['minutely', 'alerts', 'current', 'daily'],
    });

    const today = new Date();
    today.setHours(23, 59, 0);

    const dayWeather = weather.hourly.filter(
      (w) => w.dt * 1000 < today.getTime(),
    );

    const rainDaily = dayWeather
      .filter((w) => !!w.rain)
      .reduce((acc, curr) => (curr.rain?.['1h'] || 0) + acc, 0);
    const rainIntensity = this.getRainIntensity(rainDaily);
    const dayMessage = await this.messageService.getWheatherMessage(
      rainIntensity,
    );

    return {
      intensity: rainIntensity,
      message: dayMessage.message,
      is_happening: !!rainDaily,
    };
  }
}
