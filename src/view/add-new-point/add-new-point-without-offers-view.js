// import EventListItemView from './event-list-item-view.js';
import {createElement} from '../../render.js';
import {createAddNewPointWithoutOffersTemplate} from '../add-new-point/add-new-point-without-offers-template.js';

export default class AddNewPointWithoutOffersView {
  getTemplate() {
    return createAddNewPointWithoutOffersTemplate();
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
