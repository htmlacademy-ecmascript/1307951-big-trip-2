import { render } from '../framework/render.js';
import EventListView from '../view/event-list-view/event-list-view.js';
import SortView from '../view/sort-view/sort-view.js';


export default class EventContentPresenter {
  #eventContainer = null;
  #tripEventsModel = null;
  constructor({eventsContainer, tripEventsModel}) {
    this.#eventContainer = eventsContainer;
    this.#tripEventsModel = tripEventsModel;

  }

  setListLength (length) {
    this.listLength = length;
  }

  setEventListElement() {

    this.eventList = new EventListView({ listContainer: this.#eventContainer, tripEventsModel: this.#tripEventsModel });
    render(this.eventList, this.#eventContainer);
    this.eventList.init();
  }

  setSortFormElement() {
    this.sortForm = new SortView();

    if (this.#eventContainer.childElementCount === 1) {
      render(this.sortForm, this.#eventContainer);
      // this.#eventContainer.appendChild(this.sortForm);

    } else if (this.#eventContainer.childElementCount > 1) {

      this.#eventContainer.insertBefore(this.sortForm.element, this.#eventContainer.firstElementChild.nextElementSibling);
    }
  }

  init() {
    this.setEventListElement();
    this.setSortFormElement();
    // this.setEditFormElement();
  }

}
