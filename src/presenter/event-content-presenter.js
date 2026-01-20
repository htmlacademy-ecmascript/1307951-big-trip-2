import { render } from '../render.js';
import EventListView from '../view/event-list-view/event-list-view.js';
import SortView from '../view/sort-view/sort-view.js';
import EditFormView from '../view/edit-form-view/edit-form-view.js';


export default class EventContentPresenter {
  constructor({eventsContainer, tripEventsModel}) {
    this.eventContainer = eventsContainer;
    // this.listLength = listLength;
    this.tripEventsModel = tripEventsModel;

  }

  setListLength (length) {
    this.listLength = length;
  }

  setEventListElement() {
    // this.eventList = new EventListView({ listContainer: this.eventContainer, listLength: this.listLength });
    this.eventList = new EventListView({ listContainer: this.eventContainer, tripEventsModel: this.tripEventsModel });
    render(this.eventList, this.eventContainer);
    this.eventList.init();
  }

  setSortFormElement() {
    this.sortForm = new SortView();
    if (this.eventContainer.childElementCount === 1) {
      this.eventContainer.appendChild(this.sortForm);
    } else if (this.eventContainer.childElementCount > 1) {
      this.eventContainer.insertBefore(this.sortForm.getElement(), this.eventContainer.firstElementChild.nextElementSibling);
    }
  }

  setEditFormElement() {
    this.eventList.addListItemBefore();
    this.editForm = new EditFormView();
    this.eventList.getElement().firstElementChild.append(this.editForm.getElement());
  }
  // TODO: добавить объекты событий

  init() {
    this.setEventListElement();
    this.setSortFormElement();
    this.setEditFormElement();
  }

}
