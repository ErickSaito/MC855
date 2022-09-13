import Axios from 'axios';
import { OPEN_WEATHER_API_KEY, OPEN_WEATHER_URL } from '../config/config';
import { OpenWeatherRequest, OpenWeatherResponse } from './types';

const OpenWeatherAPI = ({ axios = Axios } = {}) => {
  const api = { getWeather };

  async function getWeather(
    req: OpenWeatherRequest,
  ): Promise<OpenWeatherResponse> {
    const { latitude, longitude, exclude } = req;
    const { data } = await axios.get(
      `${OPEN_WEATHER_URL}?appid=${OPEN_WEATHER_API_KEY}&units=metric&lat=${latitude}&lon=${longitude}&exclude=${exclude.toString()}`,
    );

    return data;
  }

  return api;
};

export default OpenWeatherAPI;
