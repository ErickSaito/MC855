import { RainIntesity } from '../weather/types';

export interface WeatherMessage {
  id: string;
  message: string;
  rain_intensity: RainIntesity;
}

export interface WeatherMessageFilter {
  rain_intesity?: RainIntesity;
}
