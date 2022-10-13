import { WeatherMessage } from './types';

export const MESSAGES: WeatherMessage[] = [
  {
    id: '1',
    rain_intensity: 'intense',
    message:
      'Did you rent a boat? Maybe could be a good idea, a river will fall from the sky today',
  },
  {
    id: '2',
    rain_intensity: 'high',
    message: 'A raincoat may be needed. It will rain a lot',
  },
  {
    id: '3',
    rain_intensity: 'normal',
    message: 'You should get an umbrella, it will rain, but not too much',
  },
  {
    id: '4',
    rain_intensity: 'low',
    message:
      'It will just drizzling today, you can leave your umbrella at home.',
  },
  {
    id: '5',
    rain_intensity: 'none',
    message: 'Have a wonderful day, it will not rain today.',
  },
];
