import { Injectable } from '@nestjs/common';
import { SyncDeviceDTO } from './types';
import { db, msg } from '../config/firebase';
import { schedule } from 'node-cron';

@Injectable()
export class DeviceService {
  constructor() {
    this.scheduleNotification();
  }

  async scheduleNotification() {
    // Sends notification everyday,  8am GMT-3
    schedule('0 11 * * *', async () => {
      const query = await db.collection('devices').get();
      const tokens = query.docs.map((doc) => doc.id);
      console.log(tokens);
      msg
        .sendMulticast({
          tokens,
          notification: {
            title: 'Umbrella',
            body: 'A new weather report for you :)',
          },
        })
        .then((response) => {
          if (response.failureCount > 0) {
            const failedTokens = [];
            response.responses.forEach((resp, i) => {
              if (!resp.success) {
                failedTokens.push(tokens[i]);
              }
            });
            this.cleanTokens(failedTokens);
          }
        })
        .catch((error) => console.log(error));
    });
  }

  async testNotification() {
    const query = await db.collection('devices').get();
    const tokens = query.docs.map((doc) => doc.id);
    console.log(tokens);
    msg
      .sendMulticast({
        tokens,
        notification: {
          title: 'Umbrella',
          body: 'Test',
        },
      })
      .then((response) => {
        if (response.failureCount > 0) {
          const failedTokens = [];
          response.responses.forEach((resp, i) => {
            if (!resp.success) {
              failedTokens.push(tokens[i]);
            }
          });
          this.cleanTokens(failedTokens);
        }
      })
      .catch((error) => console.log(error));
  }

  cleanTokens(tokens: Array<string>) {
    tokens.forEach((token) => {
      db.collection('devices').doc(token).delete();
    });
  }

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
