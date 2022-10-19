import { Injectable } from '@nestjs/common';
import { SyncDeviceDTO } from './types';
import { db } from '../config/firebase';

@Injectable()
export class DeviceService {
  async sync(req: SyncDeviceDTO): Promise<boolean> {
    try {
      await db.collection('devices').doc(req.token).set(req);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
