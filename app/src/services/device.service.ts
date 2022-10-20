import api from '../utils/api';
import { SyncDeviceDTO } from '../types/device';

export default class DeviceService {
  static async sync(payload: SyncDeviceDTO) {
    try {
      const res = await api.post('/device/sync', payload);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
}
