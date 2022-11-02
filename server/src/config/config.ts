import fs from 'fs';

export const OPEN_WEATHER_URL = process.env.OPEN_WEATHER_URL;
export const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;
export const GOOGLE_APPLICATION_CREDENTIALS =
  process.env.GOOGLE_APPLICATION_CREDENTIALS;

fs.writeFile(
  'mc855-umbrella-firebase-adminsdk.json',
  GOOGLE_APPLICATION_CREDENTIALS,
  (error) => {
    if (error) console.log(error);
  },
);
