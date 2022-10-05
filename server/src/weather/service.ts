import { Injectable } from '@nestjs/common';
import { WeatherMessageService } from '../message/service';
import { OpenWeatherAPI } from '../open-weather/api';
import { GetWeatherDTO, RainIntesity, Weather } from './types';

@Injectable()
export class WeatherService {
  constructor(
    private openWeatherAPI: OpenWeatherAPI,
    private messageService: WeatherMessageService,
  ) {}

  getRainIntensity(rain: number): RainIntesity {
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
      exclude: ['minutely', 'alerts'],
    });

    const current = {
      uvi: weather.current.uvi,
      temp: weather.current.temp,
      feels_like: weather.current.feels_like,
      humidity: weather.current.humidity,
      rain: !!weather.current.rain,
      rain_intensity: this.getRainIntensity(weather.current.rain?.['1h']),
    };

    const todayNoon = new Date();
    todayNoon.setHours(12, 0, 0);
    const todayNight = new Date();
    todayNight.setHours(18, 0, 0);
    const tomorrowTime = new Date();
    tomorrowTime.setHours(0, 0, 0);

    const weatherInEve = weather.hourly.filter(
      (w) =>
        w.dt * 1000 >= todayNoon.getTime() &&
        w.dt * 1000 <= todayNight.getTime(),
    );
    const rainEve = weatherInEve
      .filter((w) => !!w.rain)
      .reduce((acc, curr) => (curr.rain['1h'] || 0) + acc, 0);
    const rainIntensityEve = this.getRainIntensity(rainEve);
    const eveMessage = await this.messageService.getWheatherMessage(
      'afternoon',
      rainIntensityEve,
    );
    const eve = {
      temp: weather.daily[0].temp.eve,
      feels_like: weather.daily[0].feels_like.eve,
      humidity: weather.daily[0].humidity,
      rain: !!rainEve,
      rain_intensity: rainIntensityEve,
      message: eveMessage.message,
    };

    const weatherInNight = weather.hourly.filter(
      (w) =>
        w.dt * 1000 >= todayNight.getTime() &&
        w.dt * 1000 <= tomorrowTime.getTime(),
    );
    const rainNight = weatherInNight
      .filter((w) => !!w.rain)
      .reduce((acc, curr) => (curr.rain?.['1h'] || 0) + acc, 0);
    const rainIntensityNight = this.getRainIntensity(rainNight);
    const nightMessage = await this.messageService.getWheatherMessage(
      'night',
      rainIntensityNight,
    );
    const night = {
      temp: weather.daily[0].temp.night,
      feels_like: weather.daily[0].feels_like.night,
      humidity: weather.daily[0].humidity,
      rain: !!rainNight,
      rain_intensity: rainIntensityNight,
      message: nightMessage.message,
    };

    const rainIntensityTomorrow = this.getRainIntensity(weather.daily[1].rain);
    const tomorrowMessage = await this.messageService.getWheatherMessage(
      'tomorrow',
      rainIntensityTomorrow,
    );
    const tomorrow = {
      temp: weather.daily[1].temp,
      feels_like: weather.daily[1].feels_like,
      humidity: weather.daily[1].humidity,
      rain: !!weather.daily[1].rain,
      uvi: weather.daily[1].uvi,
      rain_intensity: rainIntensityTomorrow,
      message: tomorrowMessage.message,
    };

    return {
      current,
      night,
      eve,
      tomorrow,
    };
  }
}
