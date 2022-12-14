import { Injectable } from '@nestjs/common';
import { WeatherMessageService } from '../message/service';
import { OpenWeatherAPI } from '../open-weather/api';
import { OpenWeatherResponse } from '../open-weather/types';
import { GetWeatherDTO, Intensity, Weather } from './types';

@Injectable()
export class WeatherService {
  constructor(
    private openWeatherAPI: OpenWeatherAPI,
    private messageService: WeatherMessageService,
  ) {}

  getRainIntensity(rain: number): Intensity {
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

  getColdIntensity(feels_like: number): Intensity {
    if (feels_like < 10) {
      return 'none';
    }

    if (feels_like <= 20) {
      return 'low';
    }

    if (feels_like <= 25) {
      return 'normal';
    }

    if (feels_like <= 30) {
      return 'high';
    }

    return 'intense';
  }

  getUvIntensity(uvi: number): Intensity {
    if (uvi <= 2) {
      return 'low';
    }

    if (uvi <= 5) {
      return 'normal';
    }

    if (uvi <= 7) {
      return 'high';
    }

    return 'intense';
  }

  async getRainInfomation(weather: OpenWeatherResponse): Promise<Weather> {
    const today = new Date();
    today.setHours(23, 59, 0);

    const dayWeather = weather.hourly.filter(
      (w) => w.dt * 1000 < today.getTime(),
    );

    const rainDaily = dayWeather
      .filter((w) => !!w.rain)
      .reduce((acc, curr) => (curr.rain?.['1h'] || 0) + acc, 0);
    const rainIntensity = this.getRainIntensity(rainDaily);
    const dayMessage = await this.messageService.getMessage({
      intensity: rainIntensity,
      type: 'rain',
    });

    return {
      type: 'rain',
      intensity: rainIntensity,
      message: dayMessage.message,
      is_happening: !!rainDaily,
    };
  }

  async getColdInformation(weather: OpenWeatherResponse): Promise<Weather> {
    const today = new Date();
    today.setHours(23, 59, 0);

    const dayWeather = weather.hourly.filter(
      (w) => w.dt * 1000 < today.getTime(),
    );

    const feelsLikeDaily = dayWeather.reduce(
      (acc, curr) => curr.feels_like + acc,
      0,
    );
    const feelsLikeIntensity = this.getColdIntensity(
      feelsLikeDaily / dayWeather.length,
    );
    const dayMessage = await this.messageService.getMessage({
      intensity: feelsLikeIntensity,
      type: 'cold',
    });

    return {
      type: 'cold',
      intensity: feelsLikeIntensity,
      message: dayMessage.message,
      is_happening: feelsLikeDaily < 20,
    };
  }

  async getUvInformation(weather: OpenWeatherResponse): Promise<Weather> {
    const today = new Date();
    today.setHours(23, 59, 0);

    const dayWeather = weather.hourly.filter(
      (w) => w.dt * 1000 < today.getTime(),
    );

    const uvDaily = dayWeather.reduce((acc, curr) => curr.uvi + acc, 0);
    const uvIntensity = this.getUvIntensity(uvDaily / dayWeather.length);
    const dayMessage = await this.messageService.getMessage({
      intensity: uvIntensity,
      type: 'uv',
    });

    return {
      type: 'uv',
      intensity: uvIntensity,
      message: dayMessage.message,
      is_happening: true,
    };
  }

  async getWeather(req: GetWeatherDTO): Promise<Weather[]> {
    const weather = await this.openWeatherAPI.getWeather({
      latitude: req.latitude,
      longitude: req.longitude,
      exclude: ['minutely', 'alerts', 'current', 'daily'],
    });

    const rainInfo = await this.getRainInfomation(weather);
    const coldInfo = await this.getColdInformation(weather);
    const uvInfo = await this.getUvInformation(weather);

    return [rainInfo, coldInfo, uvInfo];
  }
}
