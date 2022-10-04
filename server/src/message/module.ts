import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenWeatherAPI } from '../open-weather/api';
import { WeatherController } from '../weather/controller';
import { WeatherService } from '../weather/service';

@Module({
  providers: [WeatherService, OpenWeatherAPI],
  controllers: [WeatherController],
  imports: [ConfigModule.forRoot(), HttpModule],
})
export class WeatherMessageModule {}
