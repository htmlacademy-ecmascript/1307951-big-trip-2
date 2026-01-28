import {createElement, render, RenderPosition} from '../../render.js';
import EventItemView from '../event-item-view/event-item-view.js';
import EventListItemView from '../event-list-item-view/event-list-item-view.js';
import { createEventListTemplate } from './event-list-template.js';

export default class EventListView {
  constructor ({listContainer, tripEventsModel}) {
    this.listContainer = listContainer;
    // this.listLength = listLength;
    this.tripEventsModel = tripEventsModel;
  }

  getTemplate() {
    return createEventListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeAllElements() {
    this.element = null;
  }

  removeOneElementByIndex(index) {
    document.querySelector(`li:nth-child(${index + 1})`).remove();
  }

  clearElement() {
    this.element.innerHTML = '';
  }

  addListItemBefore() {
    // this.getElement().prepend((new EventListItemView()).getElement());
    render(new EventListItemView(), this.getElement(), RenderPosition.AFTERBEGIN);
  }

  /**
 * добавляет оболочку каждому событию, состоящую из li
 */
  addListItems() {
    const fragment = document.createDocumentFragment();
    const dataLength = this.tripEventsModel.getTripEventsLength();
    for (let i = 0; i < dataLength; i++) {
      fragment.appendChild((new EventListItemView()).getElement());
    }

    this.getElement().appendChild(fragment);
  }

  /**
   * добавляет внутрь каждого li div с калссом 'event'
   */
  fillWithEventItems() {
    const dataLength = this.tripEventsModel.getTripEventsLength();
    const eventsData = this.tripEventsModel.getTripEvents();
    /** взяли массив из уже добавленных li */
    const tripEvents = Array.from(this.getElement().querySelectorAll('li'));

    for (let i = 0; i < dataLength; i++) {
      // tripEvents[i].appendChild((new EventItemView({tripEventsModel : this.tripEventsModel, tripEventId : eventsData[i].id}).getElement()));
      render((new EventItemView({tripEventsModel : this.tripEventsModel, tripEventId : eventsData[i].id})), tripEvents[i]);
    }

  }

  init() {
    this.addListItems();
    this.fillWithEventItems();
  }
}
