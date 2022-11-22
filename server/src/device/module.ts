import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseApp } from '../firebase/firebase';
import { DeviceController } from './controller';
import { DeviceService } from './service';

@Module({
  providers: [FirebaseApp, DeviceService],
  controllers: [DeviceController],
  imports: [ConfigModule.forRoot(), HttpModule],
})
export class DeviceModule {}
