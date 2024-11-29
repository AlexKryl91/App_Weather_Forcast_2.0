import type { IDailyMeteoData } from '@/types/types';

export function dateSetCreator(timestamp: string) {
  const dateObj = new Date(timestamp);

  const dow = dateObj.toLocaleDateString('ru-RU', {
    weekday: 'long',
  });
  const dowShort = dateObj.toLocaleDateString('ru-RU', {
    weekday: 'short',
  });

  const date = dateObj
    .toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .slice(0, -3);

  const dateShort = date.slice(0, -5);

  return {
    dow,
    dowShort,
    date,
    dateShort,
  };
}

export function tempFormatter(value: number) {
  const res = Math.round(value);
  return `${res > 0 ? '+' : ''}${res}`;
}

export function dataHourFilter(
  arr: number[],
  hoursArr: number[],
  index: number,
) {
  return arr
    .slice(index * 24, (index + 1) * 24)
    .filter((el, i) => hoursArr.includes(i));
}

export function distanceFormatter(value: number) {
  return (value / 1000).toFixed(1);
}

export function dayOrNigth(
  daily: IDailyMeteoData,
  hoursArr: number[],
  index: number,
) {
  const sunriseHour = new Date(daily.sunrise[index]).getHours();
  const sunsetHour = new Date(daily.sunset[index]).getHours();
  return hoursArr.map((el) =>
    el > sunriseHour && el < sunsetHour ? 'day' : 'night',
  );
}

export function directionDegFormatter(deg: number): string {
  if (11.25 <= deg && deg <= 33.75) return 'ССВ';
  if (33.75 < deg && deg < 56.25) return 'СВ';
  if (56.25 <= deg && deg <= 78.25) return 'ВСВ';
  if (78.25 < deg && deg < 101.25) return 'В';
  if (101.25 <= deg && deg <= 123.75) return 'ВЮВ';
  if (123.75 < deg && deg < 146.25) return 'ЮВ';
  if (146.25 <= deg && deg <= 168.75) return 'ЮЮВ';
  if (168.75 < deg && deg < 191.25) return 'Ю';
  if (191.25 <= deg && deg <= 213.75) return 'ЮЮЗ';
  if (213.75 < deg && deg < 236.25) return 'ЮЗ';
  if (236.25 <= deg && deg <= 258.75) return 'ЗЮЗ';
  if (258.75 < deg && deg < 281.25) return 'З';
  if (281.25 <= deg && deg <= 303.75) return 'ЗСЗ';
  if (303.75 < deg && deg < 326.25) return 'СЗ';
  if (326.25 <= deg && deg <= 348.75) return 'ССЗ';
  else return 'С';
}

export function weatherCodeDescription(code: number) {
  const desc: Record<number, string> = {
    0: 'Чистое небо',
    1: 'Преимущественно ясно',
    2: 'Переменная облачность',
    3: 'Пасмурно',
    45: 'Легкий туман',
    48: 'Плотный туман',
    51: 'Легкая морось',
    53: 'Средняя морось',
    55: 'Сильная морось',
    56: 'Слабая ледяная морось',
    57: 'Сильная ледяная морось',
    61: 'Слабый дождь',
    63: 'Умеренный дождь',
    65: 'Сильный дождь',
    66: 'Слабый ледяной дождь',
    67: 'Сильный ледяной дождь',
    71: 'Легкий снегопад',
    73: 'Умеренный снегопад',
    75: 'Сильный снегопад',
    77: 'Снежные зерна',
    80: 'Слабый ливень',
    81: 'Умеренный ливень',
    82: 'Сильный ливень',
    85: 'Слабый дождь со снегом',
    86: 'Сильный дождь со снегом',
    95: 'Гроза',
    96: 'Гроза с градом',
    99: 'Сильная гроза с градом',
  };

  return desc[code];
}
