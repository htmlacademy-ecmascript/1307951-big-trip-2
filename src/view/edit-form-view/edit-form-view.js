// import EventListItemView from './event-list-item-view.js';
import {createElement} from '../../render.js';
import {createEditFormTemplate} from '../edit-form-view/edit-form-template.js';

export default class EditFormView {

  constructor ({tripEventsModel, tripEvent}) {
    this.tripEventsModel = tripEventsModel;
    this.tripEvent = tripEvent;

  }

  getTemplate() {
    return createEditFormTemplate(this.tripEvent, this.tripEventsModel);
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
