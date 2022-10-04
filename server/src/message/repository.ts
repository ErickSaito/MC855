import { Injectable } from '@nestjs/common';
import { GenericRepository } from '../generics/GenericRepository';
import { MESSAGES } from './data';
import { WeatherMessage } from './types';

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

  filter(data: object): Promise<WeatherMessage[]> {}
}
