import { GetWeatherDTO, Weather } from '../types/weather';
import api from '../utils/api';

export default class WeatherService {
  static async getWeather(payload: GetWeatherDTO): Promise<Weather> {
    try {
      const res = await api.get<Weather>(
        `/weather?latitude=${payload.latitude}&longitude=${
          payload.longitude
        }&next_hour=${payload.next_hour ?? ''}`,
      );
      return res.data;
    } catch (err) {
      throw err;
      // TODO handle error and show error modal
    }
  }
}
