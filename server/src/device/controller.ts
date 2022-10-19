import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { DeviceService } from './service';
import { SyncDeviceDTO } from './types';
import { Response } from 'express';

@Controller('device')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Post('/sync')
  async sync(@Body() body: SyncDeviceDTO, @Res() res: Response) {
    const syncReponse = await this.deviceService.sync(body);

    if (syncReponse) {
      res.status(HttpStatus.OK).send();
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
