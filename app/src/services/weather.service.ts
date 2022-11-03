import { GetWeatherDTO, Weather } from '../types/weather';
import api from '../utils/api';

export default class WeatherService {
  static async getWeather(payload: GetWeatherDTO): Promise<Weather[]> {
    try {
      const res = await api.get<Weather[]>(
        `/weather?latitude=${payload.latitude}&longitude=${payload.longitude}`,
      );
      return res.data;
    } catch (err) {
      throw err;
    }
  }
}
