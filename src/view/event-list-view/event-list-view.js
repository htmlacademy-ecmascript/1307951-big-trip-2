import { render, replace} from '../../framework/render.js';
import EventItemView from '../event-item-view/event-item-view.js';
import { createEventListTemplate } from './event-list-template.js';
import AbstractView from '../../framework/view/abstract-view.js';
import EditFromView from '../edit-form-view/edit-form-view.js';


export default class EventListView extends AbstractView{
  #listContainer = null;
  #tripEventsModel = null;
  #tripEvents = null;

  constructor ({listContainer, tripEventsModel}) {
    super();
    this.#listContainer = listContainer;
    this.#tripEvents = [...tripEventsModel.getTripEvents()];
    this.#tripEventsModel = tripEventsModel;
  }

  get template() {
    return createEventListTemplate();
  }

  clearElement() {
    this.element.innerHTML = '';
  }

  #renderEvent(tripEvent) {

    const eventParam = {
      dateFrom: tripEvent.dateFrom,
      dateTo: tripEvent.dateTo,
      basePrice: tripEvent.basePrice,
      type: tripEvent.type,
      title: this.#tripEventsModel.getTripTitle(tripEvent),
      offers: this.#tripEventsModel.getOffersByEvent(tripEvent),
    };

    const formParam = {
      dateFrom: tripEvent.dateFrom,
      dateTo: tripEvent.dateTo,
      basePrice: tripEvent.basePrice,
      type: tripEvent.type,
      destination: this.#tripEventsModel.getDestinationPoint(tripEvent.destination),
      allOffers: this.#tripEventsModel.getAllOffersByType(tripEvent.type),
      appliedOffers: this.#tripEventsModel.getOffersByEvent(tripEvent)
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFromToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const tripEventComponent = new EventItemView({eventParam, onClick : () => {
      replaceEventToFrom();
      document.addEventListener('keydown', escKeyDownHandler);
    }});

    const eventEditFormComponent = new EditFromView({formParam, onEditClick: () => {
      replaceFromToEvent();
      document.removeEventListener('keydown', escKeyDownHandler);
    }});

    function replaceFromToEvent() {
      replace(tripEventComponent, eventEditFormComponent);
    }

    function replaceEventToFrom() {
      replace(eventEditFormComponent, tripEventComponent);
    }

    render(tripEventComponent, this.element);
  }

  init() {
    for (let i = 0; i < this.#tripEvents.length; i++) {
      this.#renderEvent(this.#tripEvents[i]);
    }
  }
}
