import type {
  IFetchedMeteoData,
  IReDailyMeteoData,
  IReHourlyMeteoData,
  IReMeteoData,
} from '@/types/types';
import {
  tempFormatter,
  dataHourFilter,
  distanceFormatter,
  directionDegFormatter,
  dayOrNigth,
  dateSetCreator,
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

    dayData.hourly = {} as IReHourlyMeteoData;
    dayData.hourly.hours = hoursIndexPreset.map((hour) => `${hour}:00`);
    dayData.hourly.sunTag = dayOrNigth(daily, hoursIndexPreset, i);

    dayData.hourly.weatherCode = dataHourFilter(
      hourly.weather_code,
      hoursIndexPreset,
      i,
    );

    dayData.hourly.temperature = dataHourFilter(
      hourly.temperature_2m,
      hoursIndexPreset,
      i,
    ).map(tempFormatter);

    dayData.hourly.apparentTemperature = dataHourFilter(
      hourly.apparent_temperature,
      hoursIndexPreset,
      i,
    );

    dayData.hourly.pressure = dataHourFilter(
      hourly.surface_pressure,
      hoursIndexPreset,
      i,
    ).map((el) => Math.round(el * 0.750062));

    dayData.hourly.windSpeed = dataHourFilter(
      hourly.wind_speed_10m,
      hoursIndexPreset,
      i,
    ).map((el) => el.toFixed(1));

    dayData.hourly.windGusts = dataHourFilter(
      hourly.wind_gusts_10m,
      hoursIndexPreset,
      i,
    ).map((el) => el.toFixed(1));

    dayData.hourly.windDirection = dataHourFilter(
      hourly.wind_direction_10m,
      hoursIndexPreset,
      i,
    ).map(directionDegFormatter);

    dayData.hourly.humidity = dataHourFilter(
      hourly.relative_humidity_2m,
      hoursIndexPreset,
      i,
    );

    dayData.hourly.precipitation = dataHourFilter(
      hourly.precipitation,
      hoursIndexPreset,
      i,
    );

    dayData.hourly.cloudCover = dataHourFilter(
      hourly.cloud_cover,
      hoursIndexPreset,
      i,
    );

    dayData.hourly.visibility = dataHourFilter(
      hourly.visibility,
      hoursIndexPreset,
      i,
    ).map(distanceFormatter);

    result.daily.push(dayData);
  }

  return result;
}

export default meteoDataBuilder;
