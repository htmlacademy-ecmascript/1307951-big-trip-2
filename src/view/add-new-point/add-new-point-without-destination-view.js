// import EventListItemView from './event-list-item-view.js';
import {createElement} from '../../render.js';
import {createAddNewPointWithoutDestinationTemplate} from '../add-new-point/add-new-point-without-destination-template.js'

export default class AddNewPoinWithoutDestinationtView {
  getTemplate() {
    return createAddNewPointWithoutDestinationTemplate();
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
