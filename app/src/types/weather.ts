export interface GetWeatherDTO {
  latitude: number;
  longitude: number;
}

export interface Weather {
  rain: boolean;
  rain_intensity?: RainIntesity;
  message: string;
}

export type RainIntesity = 'normal' | 'low' | 'high' | 'intense' | 'none';

export interface WeatherMessage {
  id: string;
  message: string;
  rain_intensity: RainIntesity;
}

export interface WeatherMessageFilter {
  rain_intesity?: RainIntesity;
}

export const WhenWillRainText = {
  afternoon: 'in the afternoon',
  night: 'at night',
  morning: 'in the morning',
};

export type RainTime = 'afternoon' | 'night' | 'morning';
