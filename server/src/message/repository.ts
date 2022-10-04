import { Injectable } from '@nestjs/common';
import { GenericRepository } from '../generics/GenericRepository';
import { WeatherMessage } from './types';

@Injectable()
export class WeatherMessageRepository
  implements GenericRepository<WeatherMessage>
{
  get(id: string): Promise<WeatherMessage> {
    return undefined;
  }

  filter(data: object): Promise<WeatherMessage[]> {}
}
