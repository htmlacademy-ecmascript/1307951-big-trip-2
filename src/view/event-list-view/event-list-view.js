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

  removeElement() {
    this.element = null;
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
    const tripEvents = Array.from(this.getElement().querySelectorAll('li'));

    for (let i = 0; i < dataLength; i++) {
      // tripEvents[i].appendChild((new EventItemView({tripEventsModel : this.tripEventsModel, tripEventId : eventsData[i].id}).getElement()));
      render((new EventItemView({tripEventsModel : this.tripEventsModel, tripEventId : eventsData[i].id})), tripEvents[i]);
    }

  }

  openEditFromById() {

  }

  init() {
    this.addListItems();
    this.fillWithEventItems();
  }
  // addListItems(elementsNumber) {

  //   const fragment = document.createDocumentFragment();
  //   for (let i = 0; i < elementsNumber; i++) {
  //     fragment.appendChild((new EventListItemView()).getElement());
  //   }

  //   return this.getElement().appendChild(fragment);
  // }

  // fillWithElements(elementsNumber) {

  //   const fragment = document.createDocumentFragment();

  //   for (let i = 0; i < 1; i++) {
  //     const eventItem = new EventItemView();
  //     const eventListItem = new EventListItemView();
  //     const eventListElement = eventListItem.getElement();
  //     const eventItemElement = eventItem.getElement();
  //     const finalElement = eventListElement.appendChild(eventItemElement);
  //     console.log(eventListElement);

  //     const eliItem = eventListItem.getElement().appendChild(eventItem.getElement());
  //     // console.log(eliItem);
  //     const listItem = this.getElement()
  //       .appendChild(eventListItem.getElement()
  //         .appendChild(eventItem.getElement()));
  //     // console.log(listItem);
  //     fragment.appendChild(listItem);
  //   }

  //   return this.element.appendChild(fragment);

  // }
}
