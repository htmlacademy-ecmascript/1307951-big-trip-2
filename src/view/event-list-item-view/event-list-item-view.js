import {createElement} from '../../render.js';
import {createEventListItemTemplate} from '../event-list-item-view/event-list-item-template.js';

export default class EventListItemView {
  getTemplate() {
    return createEventListItemTemplate();
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
