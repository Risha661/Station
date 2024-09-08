import './style.css';
import {Truck, PassangerCar, Gas} from './modules/car';
import {Station} from './modules/station';

const open = document.querySelector('.open');
const car = document.querySelector('.car');

const testArray = {
  passangerCar: [
    ['Opel', 'Crossland', 45],
    ['Opel', 'Grandland X', 53],
    ['Mazda', 'cx-5', 55],
    ['BMW', 'M5', 68],
    ['BMW', 'X5', 80],
    ['BMW', 'X5d', 80, 'diesel'],
    ['BMW', 'X3', 65],
    ['BMW', '5', 66],
  ],
  truck: [
    ['MAN', 'TGS', 400],
    ['MAN', 'TGX', 300],
    ['Mercedes-Benz', 'Actros', 450],
    ['Mercedes-Benz', 'Actros L', 650],
    ['Volvo', 'FH16', 700],
    ['Volvo', 'FM', 700],
    ['Volvo', 'FMX', 540],
  ],
  gasMobil: [
    ['tesla', 'cybertrack', 100],
    ['tesla', 'model3', 200],
    ['tesla', 'modelX', 300],
  ],
};

const getTestCar = () => {
  const typeBool = Math.floor(Math.random() * 3);
  if (typeBool === 0) {
    const listCar = testArray.passangerCar;
    const randomCar = listCar[(Math.floor(Math.random() * listCar.length))];
    return (new PassangerCar(...randomCar));
  } else if (typeBool === 1) {
    const listCar = testArray.truck;
    const randomCar = listCar[(Math.floor(Math.random() * listCar.length))];
    return (new Truck(...randomCar));
  }
  const listCar = testArray.gasMobil;
  const randomCar = listCar[(Math.floor(Math.random() * listCar.length))];
  return (new Gas(...randomCar));
};

const station = new Station([
  {
    type: 'petrol',
  },
  {
    type: 'diesel',
  },
  {
    type: 'gaz',
  },
], '.app');


open.addEventListener('click', () => {
  station.init();
  open.remove();
  car.style.display = 'block';
  car.addEventListener('click', () => {
    station.addCarQueue(getTestCar());
  });
});


