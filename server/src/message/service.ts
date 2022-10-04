import { Injectable } from '@nestjs/common';
import { WeatherMessageRepository } from './repository';

@Injectable()
export class WeatherMessageService {
  constructor(repository: WeatherMessageRepository) {}
  
}
