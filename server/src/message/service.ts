import { Injectable } from '@nestjs/common';
import { Intesity } from '../weather/types';
import { WeatherMessageRepository } from './repository';
import { WeatherMessage } from './types';

@Injectable()
export class WeatherMessageService {
  constructor(private repository: WeatherMessageRepository) {}

  async getWheatherMessage(intensity: Intesity): Promise<WeatherMessage> {
    const messagesTemplate = await this.repository.filter({
      intesity: intensity,
    });

    const messages = messagesTemplate.map((mgs) => ({
      id: mgs.id,
      message: mgs.message,
      intensity: mgs.intensity,
    }));

    const randomIndex = Math.floor(Math.random() * messages.length);

    return messages[randomIndex];
  }
}
