import { Intensity } from '../weather/types';

export interface WeatherMessage {
  id: string;
  type: 'rain' | 'cold';
  message: string;
  intensity: Intensity;
}

export interface WeatherMessageFilter {
  type?: 'rain' | 'cold';
  intesity?: Intensity;
}

export const WhenWillRainText = {
  afternoon: 'in the afternoon',
  night: 'at night',
  morning: 'in the morning',
};

export type RainTime = 'afternoon' | 'night' | 'morning';
