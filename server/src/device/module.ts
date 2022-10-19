import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DeviceController } from './controller';
import { DeviceService } from './service';

@Module({
  providers: [DeviceService],
  controllers: [DeviceController],
  imports: [ConfigModule.forRoot(), HttpModule],
})
export class DeviceModule {}
