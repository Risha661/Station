import { Column } from './column';
import {RenderStation} from './renderStation';

export class Station {
  #queue = [];
  #filling = [];
  #ready = [];

  constructor(typeStation, renderApp = null) {
    this.typeStation = typeStation;
    this.renderApp = renderApp;
    this.RenderStation = null;
  }

  get filling() {
    return this.#filling;
  }

  get queue() {
    return this.#queue;
  }

  init() {
    for(const optionStation of this.typeStation) {
      for (let i = 0; i < optionStation.count; i++) {
        this.#filling.push(new Column(optionStation.type, optionStation.speed));
      }
    }

    setInterval(() => {
      this.checkQueueToFilling();
    }, 2000);
  }

  checkQueueToFilling() {
    if (this.#queue.length) {
      for (let i = 0; i < this.#queue.length; i++) {
        for (let j = 0; j < this.#filling.length; j++) {
          if (!this.#filling[j].car &&
            this.#queue[i].typeFuel === this.#filling[j].type) {
            this.#filling[j].car = this.#queue.splice(i, 1)[0];
            this.fillingGo(this.#filling[j]);
            break;
          }
        }
      }
    }
  }

  fillingGo(column) {
    const car = column.car;
    const start = column.car.needPetrol;
    const timerId = setInterval(() => {
      car.nowTank += column.speed;
      if (car.nowTank >= car.maxTank) {
        clearInterval(timerId);
        const total = car.nowTank - start;
        column.car = null;
        this.leaveClient({car, total});
      }
    }, 1000);
  }

  leaveClient({car, total}) {
    this.#ready.push(car);
    console.log(car.getTitle(), total);
  }

  addCarQueue(car) {
    this.#queue.push(car);
  }
}
