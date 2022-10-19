import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeviceModule } from './device/module';
import { WeatherModule } from './weather/module';

@Module({
  imports: [WeatherModule, DeviceModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
