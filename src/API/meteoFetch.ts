import controlledFetch from './controlledFetch';
import type { ILocation } from '@/types/types';

async function meteoFetch({ latitude, longitude }: ILocation) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,wind_speed_10m_max,&wind_speed_unit=ms&timezone=auto`;

  return controlledFetch(url);
}

export default meteoFetch;
