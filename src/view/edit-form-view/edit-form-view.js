// import EventListItemView from './event-list-item-view.js';
import {createElement} from '../../render.js';
import {createEditFormTemplate} from '../edit-form-view/edit-form-template.js';

export default class EditFormView {
  getTemplate() {
    return createEditFormTemplate();
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
