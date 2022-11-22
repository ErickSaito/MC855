import { Intensity } from '../weather/types';

export interface WeatherMessage {
  id: string;
  type: 'rain' | 'cold' | 'uv';
  message: string;
  intensity: Intensity;
}

export interface WeatherMessageFilter {
  type?: 'rain' | 'cold' | 'uv';
  intensity?: Intensity;
}

export const WhenWillRainText = {
  afternoon: 'in the afternoon',
  night: 'at night',
  morning: 'in the morning',
};

export type RainTime = 'afternoon' | 'night' | 'morning';
