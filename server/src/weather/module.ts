import { Module } from '@nestjs/common';
import { OpenWeatherAPI } from '../open-weather/api';

@Module({
  providers: [OpenWeatherAPI],
})
export class WeatherModule {}
