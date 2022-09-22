import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenWeatherAPI } from '../open-weather/api';
import { WeatherController } from './controller';
import { WeatherService } from './service';

@Module({
  providers: [WeatherService, OpenWeatherAPI],
  controllers: [WeatherController],
  imports: [ConfigModule.forRoot(), HttpModule],
})
export class WeatherModule {}
