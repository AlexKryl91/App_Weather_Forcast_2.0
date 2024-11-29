import type {
  IFetchedMeteoData,
  IReDailyMeteoData,
  IReHourlyMeteoData,
  IReMeteoData,
} from '@/types/types';
import {
  tempFormatter,
  distanceFormatter,
  directionDegFormatter,
  dateSetCreator,
  weatherCodeDescription,
} from './dataBuilderHelpers';

function meteoDataBuilder({
  utc_offset_seconds,
  daily,
  hourly,
}: IFetchedMeteoData) {
  const hoursIndexPreset = [6, 9, 12, 15, 18, 21];

  const result = {} as IReMeteoData;

  result.utcOffset = utc_offset_seconds / 3600;
  result.daily = [] as IReDailyMeteoData[];

  for (let i = 0; i < 7; i++) {
    const dayData = Object.assign(
      {},
      dateSetCreator(daily.time[i]),
    ) as IReDailyMeteoData;

    dayData.maxTemp = tempFormatter(daily.temperature_2m_max[i]);
    dayData.minTemp = tempFormatter(daily.temperature_2m_min[i]);
    dayData.weatherCode = daily.weather_code[i];

    dayData.hourly = [] as IReHourlyMeteoData[];

    for (let j = 0; j < hoursIndexPreset.length; j++) {
      const hIndex = hoursIndexPreset[j];
      const hourlyData = {} as IReHourlyMeteoData;
      hourlyData.hour = `${hIndex}:00`;
      hourlyData.sunTag =
        hoursIndexPreset[hIndex] > new Date(daily.sunrise[i]).getHours() &&
        hoursIndexPreset[hIndex] < new Date(daily.sunset[i]).getHours()
          ? 'day'
          : 'night';

      hourlyData.weatherCode = (() => {
        return hourly.weather_code.slice(i * 24, (i + 1) * 24)[hIndex];
      })();

      hourlyData.weatherDescription = (() => {
        const value = hourly.weather_code.slice(i * 24, (i + 1) * 24)[hIndex];
        return weatherCodeDescription(value);
      })();

      hourlyData.temperature = (() => {
        const value = hourly.temperature_2m.slice(i * 24, (i + 1) * 24)[hIndex];
        const res = Math.round(value);
        return `${res > 0 ? '+' : ''}${res}`;
      })();

      hourlyData.apparentTemperature = (() => {
        const value = hourly.apparent_temperature.slice(i * 24, (i + 1) * 24)[
          hIndex
        ];
        const res = Math.round(value);
        return `${res > 0 ? '+' : ''}${res}`;
      })();

      hourlyData.pressure = (() => {
        const value = hourly.surface_pressure.slice(i * 24, (i + 1) * 24)[
          hIndex
        ];
        return Math.round(value * 0.750062);
      })();

      hourlyData.windSpeed = (() => {
        const value = hourly.wind_speed_10m.slice(i * 24, (i + 1) * 24)[hIndex];
        return value.toFixed(1);
      })();

      hourlyData.windGusts = (() => {
        const value = hourly.wind_gusts_10m.slice(i * 24, (i + 1) * 24)[hIndex];
        return value.toFixed(1);
      })();

      hourlyData.windDirection = (() => {
        const value = hourly.wind_gusts_10m.slice(i * 24, (i + 1) * 24)[hIndex];
        return directionDegFormatter(value);
      })();

      hourlyData.humidity = (() => {
        return hourly.relative_humidity_2m.slice(i * 24, (i + 1) * 24)[hIndex];
      })();

      hourlyData.precipitation = (() => {
        return hourly.precipitation.slice(i * 24, (i + 1) * 24)[hIndex];
      })();

      hourlyData.cloudCover = (() => {
        return hourly.cloud_cover.slice(i * 24, (i + 1) * 24)[hIndex];
      })();

      hourlyData.visibility = (() => {
        const value = hourly.visibility.slice(i * 24, (i + 1) * 24)[hIndex];
        return distanceFormatter(value);
      })();

      dayData.hourly.push(hourlyData);
    }

    result.daily.push(dayData);
  }

  return result;
}

export default meteoDataBuilder;
