import { Injectable } from '@nestjs/common';
import { RainIntesity } from '../weather/types';
import { WeatherMessageRepository } from './repository';
import { WeatherMessage } from './types';

@Injectable()
export class WeatherMessageService {
  constructor(private repository: WeatherMessageRepository) {}

  async getWheatherMessage(intensity: RainIntesity): Promise<WeatherMessage> {
    const messagesTemplate = await this.repository.filter({
      rain_intesity: intensity,
    });

    const messages = messagesTemplate.map((mgs) => ({
      id: mgs.id,
      message: mgs.message,
      rain_intensity: mgs.rain_intensity,
    }));

    const randomIndex = Math.floor(Math.random() * messages.length);

    return messages[randomIndex];
  }
}
