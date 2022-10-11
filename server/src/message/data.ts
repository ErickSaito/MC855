import { WeatherMessage } from './types';

export const MESSAGES: WeatherMessage[] = [
  {
    id: '1',
    rain_intensity: 'intense',
    message:
      'Did you rent a boat? Maybe could be a good idea, a river will fall from the sky {when}',
  },
  {
    id: '2',
    rain_intensity: 'high',
    message: 'A raincoat may be needed. {when} will rain a lot',
  },
  {
    id: '3',
    rain_intensity: 'normal',
    message: 'You should get an umbrella, it will rain {when}',
  },
  {
    id: '4',
    rain_intensity: 'low',
    message: 'It will just drizzling {when}, umbrella is not needed',
  },
  {
    id: '5',
    rain_intensity: 'none',
    message: 'The sun will shine {when}',
  },
];
