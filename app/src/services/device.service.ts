import api from '../utils/api';
import { SyncDeviceDTO } from '../types/device';

export default class DeviceService {
  static async sync(payload: SyncDeviceDTO) {
    /* TODO: Sync Device Token
     * - https://rnfirebase.io/messaging/server-integration#device-tokens
     * - https://day.js.org/ - Short and up to date time library, API-compatible with moment.js
     * avoid using moment.js since it's not being maitained for years and it's very large too.
     */

    try {
      const res = await api.post('/device/sync');
      return res.data;
    } catch (err) {
      throw err;
    }
  }
}
