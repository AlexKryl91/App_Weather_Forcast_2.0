export interface IGeoData {
  admin1: string;
  admin1_id?: number;
  country: string;
  country_code: string;
  country_id?: number;
  elevation?: number;
  feature_code?: string;
  id?: number;
  latitude: number;
  longitude: number;
  name: string;
  population?: number;
  timezone?: string;
}

export interface ILocation {
  name: string;
  fullName: string;
  countryCode: string;
  latitude: number;
  longitude: number;
}

export interface IDailyMeteoData {
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  precipitation_sum: number[];
  sunrise: string[];
  sunset: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  time: string[];
  weather_code: number[];
  wind_speed_10m_max: number[];
}

interface IDailyMeteoUnits {
  apparent_temperature_max: string;
  apparent_temperature_min: string;
  precipitation_sum: string;
  sunrise: string;
  sunset: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  time: string;
  weather_code: string;
  wind_speed_10m_max: string;
}

interface IHourlyMeteoData {
  apparent_temperature: number[];
  cloud_cover: number[];
  precipitation: number[];
  relative_humidity_2m: number[];
  surface_pressure: number[];
  temperature_2m: number[];
  time: string[];
  visibility: number[];
  weather_code: number[];
  wind_direction_10m: number[];
  wind_gusts_10m: number[];
  wind_speed_10m: number[];
}

interface IHourlyMeteoUnits {
  apparent_temperature: string;
  cloud_cover: string;
  precipitation: string;
  relative_humidity_2m: string;
  surface_pressure: string;
  temperature_2m: string;
  time: string;
  visibility: string;
  weather_code: string;
  wind_direction_10m: string;
  wind_gusts_10m: string;
  wind_speed_10m: string;
}

export interface IFetchedMeteoData {
  daily: IDailyMeteoData;
  daily_units: IDailyMeteoUnits;
  elevation: number;
  generationtime_ms: number;
  hourly: IHourlyMeteoData;
  hourly_units: IHourlyMeteoUnits;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}

export interface IReHourlyMeteoData {
  apparentTemperature: string;
  cloudCover: number;
  hour: string;
  humidity: number;
  precipitation: number;
  pressure: number;
  sunTag: string;
  temperature: string;
  visibility: string;
  weatherCode: number;
  weatherDescription: string;
  windDirection: string;
  windGusts: string;
  windSpeed: string;
}

export interface IReDailyMeteoData {
  date: string;
  dateShort: string;
  dow: string;
  dowShort: string;
  maxTemp: string;
  minTemp: string;
  weatherCode: number;
  hourly: IReHourlyMeteoData[];
}

export interface IReMeteoData {
  utcOffset: number;
  daily: IReDailyMeteoData[];
}
