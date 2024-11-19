import type { IGeoData } from '@/types/types';
import controlledFetch from './controlledFetch';

async function geoFetch(value: string): Promise<IGeoData[]> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=50&language=ru&format=json`;

  return controlledFetch(url).then((data) => data?.results);
}

export default geoFetch;
