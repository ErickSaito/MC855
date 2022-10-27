import { Intesity } from '../weather/types';

export interface WeatherMessage {
  id: string;
  message: string;
  intensity: Intesity;
}

export interface WeatherMessageFilter {
  intesity?: Intesity;
}

export const WhenWillRainText = {
  afternoon: 'in the afternoon',
  night: 'at night',
  morning: 'in the morning',
};

export type RainTime = 'afternoon' | 'night' | 'morning';
