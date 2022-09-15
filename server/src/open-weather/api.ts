import { Injectable } from '@nestjs/common';
import { Axios } from 'axios';
import { OPEN_WEATHER_API_KEY, OPEN_WEATHER_URL } from '../config/config';
import { OpenWeatherRequest, OpenWeatherResponse } from './types';

@Injectable()
export class OpenWeatherAPI {
  private readonly axios: Axios;

  constructor() {
    this.axios = new Axios();
  }

  async getWeather(req: OpenWeatherRequest): Promise<OpenWeatherResponse> {
    const { latitude, longitude, exclude } = req;
    const { data } = await this.axios.get(
      `${OPEN_WEATHER_URL}?appid=${OPEN_WEATHER_API_KEY}&units=metric&lat=${latitude}&lon=${longitude}&exclude=${exclude.toString()}`,
    );
    return data;
  }
}
