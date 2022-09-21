import { Injectable } from '@nestjs/common';
import { OpenWeatherAPI } from '../open-weather/api';
import { GetWeatherDTO, Weather } from './types';

@Injectable()
export class WeatherService {
  constructor(private openWeatherAPI: OpenWeatherAPI) {}

  async getCurrentWeather(req: GetWeatherDTO): Promise<Weather> {
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
      rain: !!rain,
    };
  }

  async getNextWeather(req: GetWeatherDTO): Promise<Weather> {
    const { latitude, longitude, next_hour } = req;
    const nextWeather = await this.openWeatherAPI.getWeather({
      latitude,
      longitude,
      exclude: ['minutely', 'current', 'daily', 'alerts'],
    });

    const nextTime = next_hour * 60 * 60 + new Date().getTime() / 1000;

    const filterWeather = nextWeather.hourly.filter((weather) => {
      return weather.dt < nextTime;
    });

    const rain = !!filterWeather.find((w) => !!w.rain);

    const sumWeather = filterWeather.reduce(
      (acc, curr) => {
        return {
          uvi: curr.uvi + acc.uvi,
          feels_like: curr.feels_like + acc.feels_like,
          temp: curr.temp + acc.temp,
          humidity: curr.humidity + acc.humidity,
        };
      },
      {
        uvi: 0,
        feels_like: 0,
        temp: 0,
        humidity: 0,
      },
    );

    return {
      uvi: Math.floor(sumWeather.uvi / filterWeather.length),
      feels_like: Math.floor(sumWeather.feels_like / filterWeather.length),
      temp: Math.floor(sumWeather.temp / filterWeather.length),
      humidity: Math.floor(sumWeather.humidity / filterWeather.length),
      rain,
    };
  }
}
