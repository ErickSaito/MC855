import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './service';
import { GetWeatherDTO, Weather } from './types';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Get('/current')
  async currentWeather(
    @Query() getWeatherDTO: GetWeatherDTO,
  ): Promise<Weather> {
    return await this.weatherService.getCurrent(getWeatherDTO);
  }
}
