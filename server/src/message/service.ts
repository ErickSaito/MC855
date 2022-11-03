import { Injectable } from '@nestjs/common';
import { WeatherMessageRepository } from './repository';
import { WeatherMessage, WeatherMessageFilter } from './types';

@Injectable()
export class WeatherMessageService {
  constructor(private repository: WeatherMessageRepository) {}

  async getMessage(filter: WeatherMessageFilter): Promise<WeatherMessage> {
    const messagesTemplate = await this.repository.filter(filter);

    const messages = messagesTemplate.map((mgs) => ({
      id: mgs.id,
      type: mgs.type,
      message: mgs.message,
      intensity: mgs.intensity,
    }));

    const randomIndex = Math.floor(Math.random() * messages.length);

    return messages[randomIndex];
  }
}
