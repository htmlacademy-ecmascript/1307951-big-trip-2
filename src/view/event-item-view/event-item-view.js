import {createElement} from '../../render.js';
import { createEventTemplate } from './event-item-template.js';

export default class EventItemView {
  /** в конструктор передается объект с данными */
  constructor({tripEventsModel, tripEventId}) {
    this.tripEventsModel = tripEventsModel;
    this.tripEvent = this.tripEventsModel.getTripEventById(tripEventId);
  }

  getTemplate() {
    return createEventTemplate(this.tripEvent, this.tripEventsModel);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
