import { WeatherMessage } from './types';

export const MESSAGES: WeatherMessage[] = [
  {
    id: '1',
    type: 'rain',
    intensity: 'intense',
    message:
      'Did you rent a boat? Maybe could be a good idea, a river will fall from the sky today',
  },
  {
    id: '2',
    type: 'rain',
    intensity: 'high',
    message: 'A raincoat may be needed. It will rain a lot',
  },
  {
    id: '3',
    type: 'rain',
    intensity: 'normal',
    message: 'You should get an umbrella, it will rain, but not too much',
  },
  {
    id: '4',
    type: 'rain',
    intensity: 'low',
    message:
      'It will just drizzling today, you can leave your umbrella at home.',
  },
  {
    id: '5',
    type: 'rain',
    intensity: 'none',
    message: 'Have a wonderful day, it will not rain today.',
  },

  {
    id: '6',
    type: 'cold',
    intensity: 'intense',
    message:
      'You know, you should find a way to build a fire to warm yourself, otherwise...',
  },
  {
    id: '7',
    type: 'cold',
    intensity: 'high',
    message: 'Get a coat before leaving home.',
  },
  {
    id: '8',
    type: 'cold',
    intensity: 'normal',
    message: 'Today is not too hot nor too cold, the perfect temperature.',
  },
  {
    id: '9',
    type: 'cold',
    intensity: 'low',
    message:
      "I'm sweating, but the temperature is still ok! Don't forget to drink water.",
  },

  {
    id: '10',
    type: 'cold',
    intensity: 'none',
    message:
      'Someone might have forgotten the oven on. Today will be extremely hot.',
  },

  {
    id: '11',
    type: 'uv',
    intensity: 'intense',
    message:
      'Caution! The UV is extremely high! You should stay home under your blankets and apply A LOT sunscreen!',
  },
  {
    id: '12',
    type: 'uv',
    intensity: 'high',
    message:
      'Take extra care today, try to avoid going outside and apply A LOT of sunscreen!',
  },
  {
    id: '13',
    type: 'uv',
    intensity: 'normal',
    message:
      'The UV index today is a little to high, please, apply some sunscreen!',
  },
  {
    id: '14',
    type: 'uv',
    intensity: 'low',
    message:
      "Looks like it's gonna be a normal day, but you should still apply some sunscreen!",
  },
  {
    id: '15',
    type: 'uv',
    intensity: 'none',
    message:
      "Looks like it's gonna be a normal day, but you should still apply some sunscreen!",
  },
];
