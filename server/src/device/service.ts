import { Injectable } from '@nestjs/common';
import { schedule } from 'node-cron';
import { FirebaseApp } from '../firebase/firebase';
import { SyncDeviceDTO } from './types';

@Injectable()
export class DeviceService {
  constructor(private firebaseapp: FirebaseApp) {
    this.scheduleNotification();
  }

  async scheduleNotification() {
    // Sends notification everyday,  8am GMT-3
    schedule('0 11 * * *', async () => {
      const query = await this.firebaseapp
        .getFirestore()
        .collection('devices')
        .get();
      const tokens = query.docs.map((doc) => doc.id);
      this.firebaseapp
        .getMessaging()
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
    const query = await this.firebaseapp
      .getFirestore()
      .collection('devices')
      .get();
    const tokens = query.docs.map((doc) => doc.id);
    this.firebaseapp
      .getMessaging()
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
      this.firebaseapp.getFirestore().collection('devices').doc(token).delete();
    });
  }

  async sync(req: SyncDeviceDTO): Promise<boolean> {
    try {
      await this.firebaseapp
        .getFirestore()
        .collection('devices')
        .doc(req.token)
        .set(req);
      return true;
    } catch (error) {
      return false;
    }
  }
}
