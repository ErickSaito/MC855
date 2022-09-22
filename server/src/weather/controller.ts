import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './service';
import { DayWeather, GetWeatherDTO, Weather } from './types';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Get('/current')
  async currentWeather(
    @Query() getWeatherDTO: GetWeatherDTO,
  ): Promise<Weather> {
    return await this.weatherService.getCurrentWeather(getWeatherDTO);
  }

  @Get('/next')
  async nextWeather(@Query() getWeatherDTO: GetWeatherDTO): Promise<Weather> {
    return await this.weatherService.getNextWeather(getWeatherDTO);
  }

  @Get('/today')
  async todayWeather(
    @Query() getWeatherDTO: GetWeatherDTO,
  ): Promise<DayWeather> {
    return await this.weatherService.getTodayWeather(getWeatherDTO);
  }
}
