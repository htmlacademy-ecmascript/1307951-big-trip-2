import {createElement} from '../../render.js';
import {createFilterTemplate} from '../filter-view/filter-template.js';

export default class FilterView {
  getTemplate() {
    return createFilterTemplate();
  }

  getElement() {
    if (!this.element) {
      // если объекта не сущетсвует, то создаем
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }

}
