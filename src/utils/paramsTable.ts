import iconTemp from '@/assets/icons/temp.svg';
import iconPress from '@/assets/icons/arrow-down.svg';
import iconWind from '@/assets/icons/wind.svg';
import iconTornado from '@/assets/icons/tornado.svg';
import iconCompass from '@/assets/icons/compass.svg';
import iconDroplet from '@/assets/icons/droplet.svg';
import iconUmbrella from '@/assets/icons/umbrella.svg';
import iconCloud from '@/assets/icons/cloud.svg';
import iconEye from '@/assets/icons/eye.svg';

const paramsData = [
  {
    icon: iconTemp,
    iconAlt: 'Иконка температуры',
    name: 'Ощущается',
    units: '°С',
  },
  {
    icon: iconPress,
    iconAlt: 'Иконка давления',
    name: 'Давление',
    units: 'мм рт.ст.',
  },
  {
    icon: iconWind,
    iconAlt: 'Иконка ветра',
    name: 'Ветер',
    units: 'м/с',
  },
  {
    icon: iconTornado,
    iconAlt: 'Иконка торнадо',
    name: 'Порывы',
    units: 'м/с',
  },
  {
    icon: iconCompass,
    iconAlt: 'Иконка компаса',
    name: 'Направление',
    units: '',
  },
  {
    icon: iconDroplet,
    iconAlt: 'Иконка влажности',
    name: 'Влажность',
    units: '%',
  },
  {
    icon: iconUmbrella,
    iconAlt: 'Иконка зонта',
    name: 'Осадки',
    units: 'мм',
  },
  {
    icon: iconCloud,
    iconAlt: 'Иконка облака',
    name: 'Облачность',
    units: '%',
  },
  {
    icon: iconEye,
    iconAlt: 'Иконка глаза',
    name: 'Видимость',
    units: 'км',
  },
];

export default paramsData;
