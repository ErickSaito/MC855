import { RainIntesity } from '../weather/types';

export interface WeatherMessage {
  id: string;
  message: string;
  rain_intensity: RainIntesity;
}

export interface WeatherMessageFilter {
  rain_intesity?: RainIntesity;
}

export const WhenWillRainText = {
  afternoon: 'hoje à tarde',
  night: 'hoje à noite',
  tomorrow: 'amanha',
};

export type RainTime = 'afternoon' | 'night' | 'tomorrow';
