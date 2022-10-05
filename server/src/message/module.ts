import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WeatherMessageRepository } from './repository';
import { WeatherMessageService } from './service';

@Module({
  providers: [WeatherMessageRepository, WeatherMessageService],
  imports: [ConfigModule.forRoot()],
  exports: [WeatherMessageService],
})
export class WeatherMessageModule {}
