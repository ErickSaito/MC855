import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './service';
import { GetWeatherDTO, Weather } from './types';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Get('/')
  async getWeather(@Query() getWeatherDTO: GetWeatherDTO): Promise<Weather[]> {
    const { latitude, longitude } = getWeatherDTO;

    if (!latitude || !longitude) {
      throw new BadRequestException();
    }

    return await this.weatherService.getWeather(getWeatherDTO);
  }
}
