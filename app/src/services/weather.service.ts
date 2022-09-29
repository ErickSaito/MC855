import { GetWeatherDTO } from '../types/weather';
import api from '../utils/api';

export default class WeatherService {
  static async getCurrentWeather(payload: GetWeatherDTO) {
    try {
      const res = await api.get(
        `/weather/current?latitude=${payload.latitude}&latitude=${
          payload.longitude
        }&next_hour=${payload.next_hour ?? ''}`,
      );
      return res.data;
    } catch (e) {
      // TODO handle error and show error modal
    }
  }

  static async getNextDayWeather(payload: GetWeatherDTO) {
    try {
      const res = await api.get(
        `/weather/next?latitude=${payload.latitude}&latitude=${
          payload.longitude
        }&next_hour=${payload.next_hour ?? ''}`,
      );
      return res.data;
    } catch (e) {
      // TODO handle error and show error modal
    }
  }

  static async getTodaysWeather(payload: GetWeatherDTO) {
    try {
      const res = await api.get(
        `/weather/today?latitude=${payload.latitude}&latitude=${
          payload.longitude
        }&next_hour=${payload.next_hour ?? ''}`,
      );
      return res.data;
    } catch (e) {
      // TODO handle error and show error modal
    }
  }
}
