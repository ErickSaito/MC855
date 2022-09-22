import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { OpenWeatherRequest, OpenWeatherResponse } from './types';

@Injectable()
export class OpenWeatherAPI {
  constructor(private readonly httpService: HttpService) {}

  async getWeather(req: OpenWeatherRequest): Promise<OpenWeatherResponse> {
    const { latitude, longitude, exclude } = req;
    const response = await this.httpService.axiosRef.get(
      `${process.env.OPEN_WEATHER_URL}?appid=${
        process.env.OPEN_WEATHER_API
      }&units=metric&lat=${latitude}&lon=${longitude}&exclude=${exclude.toString()}`,
    );
    return response.data;
  }
}
