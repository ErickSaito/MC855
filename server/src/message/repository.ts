import { Injectable } from '@nestjs/common';
import { GenericRepository } from '../generics/GenericRepository';
import { MESSAGES } from './data';
import { WeatherMessage, WeatherMessageFilter } from './types';

@Injectable()
export class WeatherMessageRepository
  implements GenericRepository<WeatherMessage>
{
  async get(id: string): Promise<WeatherMessage> {
    const msgPromise = new Promise<WeatherMessage>((resolve, reject) => {
      const messages = MESSAGES.filter((mgs) => mgs.id === id);
      if (messages.length) {
        resolve(messages[0]);
      }
      reject(undefined);
    });

    return await msgPromise;
  }

  async filter(data: WeatherMessageFilter): Promise<WeatherMessage[]> {
    const msgPromise = new Promise<WeatherMessage[]>((resolve, reject) => {
      const messages = MESSAGES.filter(
        (mgs) => data.intesity === mgs.intensity,
      );
      if (messages.length) {
        resolve(messages);
      }
      reject(undefined);
    });

    return await msgPromise;
  }
}
