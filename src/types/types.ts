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
  latidute: number;
  longitude: number;
}
