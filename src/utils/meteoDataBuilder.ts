import type {
  IFetchedMeteoData,
  IReDailyMeteoData,
  IReHourlyMeteoData,
  IReMeteoData,
} from '@/types/types';
import {
  dateSetCreator,
  tempFormatter,
  dayOrNigthTag,
  distanceFormatter,
  directionDegFormatter,
  weatherCodeDescription,
  dataSlicer,
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
    const dayData = dateSetCreator(daily.time[i]) as IReDailyMeteoData;

    dayData.maxTemp = tempFormatter(daily.temperature_2m_max[i]);
    dayData.minTemp = tempFormatter(daily.temperature_2m_min[i]);
    dayData.weatherCode = daily.weather_code[i];
    dayData.hourly = [] as IReHourlyMeteoData[];

    hoursIndexPreset.forEach((hour) => {
      const hourlyData = {} as IReHourlyMeteoData;

      hourlyData.hour = `${hour}:00`;
      hourlyData.sunTag = dayOrNigthTag(daily, hour, i);
      hourlyData.weatherCode = dataSlicer(hourly.weather_code, i, hour);
      hourlyData.weatherDescription = weatherCodeDescription(
        dataSlicer(hourly.weather_code, i, hour),
      );
      hourlyData.temperature = tempFormatter(
        dataSlicer(hourly.temperature_2m, i, hour),
      );
      hourlyData.apparentTemperature = tempFormatter(
        dataSlicer(hourly.apparent_temperature, i, hour),
      );
      hourlyData.pressure = Math.round(
        dataSlicer(hourly.surface_pressure, i, hour) * 0.750062,
      );
      hourlyData.windSpeed = dataSlicer(hourly.wind_speed_10m, i, hour).toFixed(
        1,
      );
      hourlyData.windGusts = dataSlicer(hourly.wind_gusts_10m, i, hour).toFixed(
        1,
      );
      hourlyData.windDirection = directionDegFormatter(
        dataSlicer(hourly.wind_direction_10m, i, hour),
      );
      hourlyData.humidity = dataSlicer(hourly.relative_humidity_2m, i, hour);
      hourlyData.precipitation = dataSlicer(hourly.precipitation, i, hour);
      hourlyData.cloudCover = dataSlicer(hourly.cloud_cover, i, hour);
      hourlyData.visibility = distanceFormatter(
        dataSlicer(hourly.visibility, i, hour),
      );

      dayData.hourly.push(hourlyData);
    });

    result.daily.push(dayData);
  }

  return result;
}

export default meteoDataBuilder;
