import iconTemp from '/icons/temp.svg';
import iconPress from '/icons/arrow-down.svg';
import iconWind from '/icons/wind.svg';
import iconTornado from '/icons/tornado.svg';
import iconCompass from '/icons/compass.svg';
import iconDroplet from '/icons/droplet.svg';
import iconUmbrella from '/icons/umbrella.svg';
import iconCloud from '/icons/cloud.svg';
import iconEye from '/icons/eye.svg';

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
